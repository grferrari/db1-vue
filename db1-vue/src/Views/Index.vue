<template>
  <div id="app">
    <div><img  width="50%" height="50%" src="../../images/ram.png"></div>
    <form class="center">
      <div class="center">
          <input style="text-align: center; width:400px" id="enter" name="enter" class="input is-hovered" placeholder="Name" type="text" v-model="search">
          <div class="label" v-if=" attemptSubmit">This field is required.</div>
      </div>
      <br/>
      <a @click="validateForm" style="width:150px" class="button is-success is-focused is-medium">START</a>
      <router-link to="/rank"><a style="width:150px" class="button is-info is-focused is-medium">RANKING</a></router-link>
    </form>
    <br/>       
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
        search: '',
        attemptSubmit: false
      }
    },
    methods : {
      validateForm: function (event) {
      if (this.search != "" && this.search != null) {
        this.$router.push('/memory/' + this.search);
      } else {
          this.attemptSubmit = true;
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
