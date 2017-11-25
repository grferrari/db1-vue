<template>
  <div id="app">
    <div class="row"> 
      <div class="columns">
        <div align="center" class="column">
          <div class="title">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
    <br/>
    <div class="row"> 
      <div class="columns">
        <div align="center" class="column">
          <table class="table">
            <thead>
              <tr>
                <th><abbr title="Player">Player</abbr></th>
                <th><abbr title="Score">Score</abbr></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s of score">
                <th>{{ s.player }}</th>
                <th>{{ s.score }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <router-link to="/"><a style="width:150px" class="button is-success is-focused is-medium">Restart</a></router-link>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
      msg: 'RANKING',
      score:[]
    }
  },
  mounted() {
    axios.get('http://localhost:3000/rank')
      .then((response) => {
        console.log(response.data.rank);
        this.score = response.data.rank;
      })
      .catch((error) => {
          console.log("error");
      });
  }
}
</script>