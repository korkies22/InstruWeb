<template>
  <div class="hello">
    <ul>
      <li data-aos="fade-right">
        <h4>Carlos Mario Sarmiento</h4>
        <h4>201512466</h4>
      </li>
      <li data-aos="fade-left">
        <h4>Vihlai Maldonado</h4>
        <h4>201619479</h4>
      </li>
      <li data-aos="fade-right">
        <h4>Rubén Castillo</h4>
        <h4>201531044</h4>
      </li>
      <li data-aos="fade-left">
        <h4>Juan Manuel Castañeda</h4>
        <h4>201531027</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    import("aos").then(AOS => AOS.init());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 5rem auto;
}
a {
  color: #42b983;
}
</style>
