<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Home from './components/Home.vue';

export default {
  components: {
    'app-header': Header,
    'app-home': Home
  },
  data () {
    return {
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

div {
  background: #000;
  width: max(100vw, 1200px);
}
</style>
