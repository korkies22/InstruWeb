<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: { Header, Footer }
};
</script>

<style lang="scss">
#app {
  font-family: "Roboto Slab", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100%;
  color: #2c3e50;
  position: relative;
}

html {
  height: 100%;
}

body {
  position: relative;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
