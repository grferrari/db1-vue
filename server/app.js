const express = require('express')
const app = express()
var bodyParser = require("body-parser");
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
var config = require('./db.json')
var fs = require('fs')
app.use(bodyParser.json());
app.use(allowCrossDomain); 

app.get('/', function(req, res){
	res.send(config)
})

app.get('/move', function(req, res){
	var localMoves = require('./move.json')
	
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    res.send(JSON.stringify(localMoves));
})

app.get('/rank', function(req, res){
	var LocalRank = require('./rank.json')
	res.send(LocalRank)
})

app.post('/clear', function(req, res){
	fs.writeFile('./move.json', JSON.stringify('{"moves": []}'), 'utf-8');
})

app.post('/storeRank', function(req, res){
	var ranks = require('./rank.json')
	var player = req.body.player;
	var score = req.body.score;

	var rank = {
		player: player,
		score: score
	};
	saveRank(ranks, rank, function(err){
		if(err){
			res.status(404).send('Score not save');
			return;
		}
		res.send("Score saved");
	});
})

app.post('/save', function(req, res){
	var moves = require('./move.json')
	var id = req.body.id;
	var status = req.body.status;

	var move = {
		id: id,
		status: status
	};

	saveMove(moves, move, function(err){
		if(err){
			res.status(404).send('Move not save');
			return;
		}
		res.send("Move saved");
	});
})

function saveRank(ranks, callback){
	fs.readFile('./rank.json', 'utf-8', function readFileCallback(err, data){
		if(err){
			console.log(err);
		} else {
			var json = JSON.parse(data);
			//console.log(json);
			json.ranks.push(move);
			fs.writeFile('./rank.json', JSON.stringify(json), 'utf-8', callback);
		}
	});
}

function saveMove(moves, move, callback){
	fs.readFile('./move.json', 'utf-8', function readFileCallback(err, data){
		if(err){
			console.log(err);
		} else {
			var json = JSON.parse(data);
			//console.log(json);
			json.moves.push(move);
			fs.writeFile('./move.json', JSON.stringify(json), 'utf-8', callback);
		}
	});
}

app.listen(3000, function(){
	console.log("Listen port 3000")
})