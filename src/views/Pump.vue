<template>
  <div class="pump">
    <div
      class="pump__button"
      @click="enviarMensaje()"
      :class="encendido && 'pump__on'"
    >
      <img alt="Icono" class="icon" :src="getImgUrl" />
      <p class="pump__text" :class="encendido && 'text__on'">
        {{ encendido ? "Encendido" : "Apagado" }}
      </p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return { encendido: false, socket: null };
  },
  methods: {
    setEncender(valor) {
      this.encendido = valor;
    },
    initWebsocket() {
      /* eslint-disable */
      var ws = io("https://instrumentacionwifi.herokuapp.com", {
        autoConnect: true
      });
      var vm = this;
      this.socket = ws;
      ws.on("connect", () => {
        console.log("Eureka");
      });
      ws.on("disconnect", () => {
        console.log("RIP conn");
      });
      // event emmited when receiving message
      ws.on("message", function(ev) {
        console.log(ev);
        if (ev.startsWith("RES")) {
          vm.handleRes(ev);
        }
      });
    },
    handleRes(ev) {
      const separador = ":::";
      let value = ev.split(separador)[1];
      if (value === "ON") {
        this.setEncender(true);
      } else {
        this.setEncender(false);
      }
    },
    enviarMensaje() {
      if (!this.socket) return;
      let mensaje= this.encendido? 'OFF': 'ON';
      this.socket.emit('message',mensaje);
    }
  },
  computed: {
    getImgUrl() {
      let pet = "valveOff";
      if (this.encendido) {
        pet = "valveOn";
      }
      var images = require.context("../assets/", false, /\.svg$/);
      return images("./" + pet + ".svg");
    }
  },
  mounted() {
    this.initWebsocket();
  },
  destroyed() {
    if (this.socket) this.socket.disconnect();
  }
};
</script>

<style lang="scss" scoped>
.pump {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
  &__button {
    border-radius: 100%;
    width: 16rem;
    height: 16rem;
    background: #d3d3d8;
    margin: 2rem auto;
    box-shadow: 0px 0px 5px 5px #d3d3d8;
    border: 2px dashed black;
  }

  &__text {
    color: #2b2626;
    font-weight: 300;
    font-size: 1.5rem;
    margin: 0;
    margin-top: 1rem;
  }
}

.pump__on {
  background: #ff704d;
  box-shadow: 0px 0px 5px 5px #ff704d;
  border: 2px dashed #fafafa;
}

.text__on {
  color: white;
}

.icon {
  height: 7rem;
  margin-top: 3rem;
  margin-left: 2rem;
}
</style>
