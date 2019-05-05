<template>
  <div class="home">
    <img
      alt="Meme random"
      class="meme"
      src="https://media.giphy.com/media/mSAE6qMdL7MxG/giphy.gif"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss" scoped>
.meme {
  max-width: 100%;
}

.home {
  padding-bottom: 5rem;
}
</style>
