<template>
  <div id="nav">
    <router-link to="/">Integrantes</router-link> |
    <router-link to="/sensors">Sensores</router-link> |
    <router-link to="/pump">MotoBomba</router-link>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
