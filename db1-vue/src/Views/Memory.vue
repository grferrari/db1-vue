<template>
  <div id="app">
    <div class="row"> 
      <div class="columns">
        <div align="center" class="column">
          <div class="title">
            Player: {{ $route.params.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="row"> 
      <div class="columns">
        <div class="column">
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Move</p>
                  <p class="title">{{ moves }}</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

    <div class="row"> 
      <div class="columns">
        <div v-for="(card, index) of cards">
          <div class="column">
            <app-card v-on:clicked="onClickCard" ref="elements" v-bind:arrayIndex="index" v-bind:id="card.id" v-bind:image="getImgLink(card)"></app-card>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div style="width:250px;height:200px" class="center" >
          <nav class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading"><h1>FINAL SCORE</h1></p>
                <p class="title">{{ moves }}</p>
              </div>
            </div>
          </nav>
          <br/>
          <router-link to="/"><a style="width:150px" class="button is-success is-focused is-medium">Restart</a></router-link>
        </div>
      </div>
      <button class="modal-close"></button>
    </div>
    <router-link to="/"><a style="width:150px" class="button is-success is-focused is-medium">Restart</a></router-link>
    <router-link to="/rank"><a style="width:150px" class="button is-info is-focused is-medium">Ranking</a></router-link>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
import Card from '../Components/Card.vue'
export default {
  name: 'app',
  data () {
    return {
      cards: [], //array com as cartas.
      card_count: '',
      moves: 0, //Guarda o número de movimentos ao longo do jogo
      selected: [], //array que guarda os dois elementos a serem comparados em cada jogada.
      elements: [], //array para guardar o referencia dos elementos Card.vue criados.
      sequence: []  //array aux.

    }
  },
  components: {
    'app-card' : Card
  },
  methods: {
    /*Se retorn do json move.json conter 10 elementos é por todos os pares foram ativos*/
    checkEndGame() {
      axios.get('http://localhost:3000/move')
      .then((response) => {
          console.log(response.data.moves.length);
          if(response.data.moves.length >= 9){
            this.endGame();
          }      
      })
      .catch((error) => {
          console.log("error");
      });
    },
    endGame(){
        this.clearJsonMoves();
        this.saveRank();
        this.$router.push('/rank');
    },
    /*Salva dados do jogo atual para serem mostrados no ranking*/
    saveRank(){
      var newRank = {
        player : $route.params.name,
        score : moves
      };
      axios.post('http://localhost:3000/storeRank', newRank)
      .then((response) =>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    /*Chama um função no servidor para limpar o move.json*/
    clearJsonMoves(){
      axios.post('http://localhost:3000/clear', "")
      .then((response) =>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    restoreImageItem(){
      this.$refs.elements[this.selected[0].index].turnBack();
      this.$refs.elements[this.selected[1].index].turnBack();
      this.selected = []; 
    },
    /*Salva o movimento atual caso as duas cartas ativas sejam iguais*/
    saveMove(id) {
      var newMove = {
        id : id,
        status : true
      };
      axios.post('http://localhost:3000/save', newMove)
      .then((response) =>{
        console.log(response);
        this.checkEndGame();
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    /*Monta o link de cada imagem para atribuir a elemento Card.vue*/
    getImgLink(img) {
      var value = ['../../images/' + img.image];
      return value;
    },
    /*Função para checar se as cartas ativas são iguais*/
    checkCards(){
      this.moves++;
      console.log(this.selected[0].id + " = " + this.selected[1].id);
      if(this.selected[0].id == this.selected[1].id){
        this.saveMove(this.selected[0].id);
        this.selected = [];
      } else {
        /*Caso não sejam após um delay de 0.5s as cartas são desativadas*/
        setTimeout(
          function () { this.restoreImageItem() }.bind(this)
        , 500);
      }
    },
    /*Função recebe o retorno com os dados do elemento ativada atraves da função onClickButton do compomente Card.vue*/
    onClickCard(value){    
      let dado = {
        id: value[0].id,
        index: value[0].arrayIndex
      }
      if(value[0].seen == true){
        this.selected = this.selected.concat([dado]);
      }

      if(this.selected.length == 2){
        this.checkCards();
      }
    }
  },
  mounted() {
    /*Recebe o valor das cartas armazenadas em db.json e cria o array randomico para iniciar o jogo*/
    axios.get('http://localhost:3000/')
      .then((response) => {
        let i;
        let j = 0;
        this.cards = response.data.cards;
        this.card_count = 2*response.data.cards.length;

        for (i = 0; i < this.card_count-10; i++) {
              this.sequence[i] = this.cards[i];
        }
        for (i = 10; i < this.card_count; i++) {
              this.sequence[i] = this.cards[j];
              j++;
        }
        this.cards = [];
        this.cards = this.sequence.sort(function(){return 0.5 - Math.random()});
          
      })
      .catch((error) => {
          console.log("error");
      });
  }
}
</script>