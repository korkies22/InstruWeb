<template>
  <div class="sensors">
    <h2>Temperaturas</h2>

    <table class="card__table">
      <tr>
        <th>Sensor</th>
        <th>Valor (°C)</th>
      </tr>
      <tr>
        <td>LM35</td>
        <td>{{ tLM35.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>DTH11</td>
        <td>{{ tDHT.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>BMP180</td>
        <td>{{ tBMP.toFixed(2) }}</td>
      </tr>
    </table>

    <h3>Promedio</h3>
    <p>{{ meanTemperature.toFixed(2) }}</p>

    <h3>Desviación estándar</h3>
    <p>{{ stdTemperature.toFixed(2) }}</p>

    <h2 class="separator">Otras variables</h2>

    <table class="card__table">
      <tr>
        <th>Sensor</th>
        <th>Variable</th>
        <th>Valor</th>
      </tr>
      <tr>
        <td>FC-28</td>
        <td>Humedad en suelo (%)</td>
        <td>{{ hFC28.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>DTH11</td>
        <td>Humedad relativa (%)</td>
        <td>{{ hDHT.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>BMP180</td>
        <td>Presión (mBar)</td>
        <td>{{ pBMP.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tLM35: 20,
      tDHT: 35,
      tBMP: 21,
      pBMP: 714.4,
      hDHT: 61,
      hFC28: 50,
      socket: null
    };
  },
  methods: {
    initWebsocket() {
      /* eslint-disable */
      const ws = new WebSocket("wss://instrumentacionwifi.herokuapp.com");

      var vm = this;
      this.socket = ws;
      // Listen for messages
      // Connection opened
      ws.addEventListener("closed", function(event) {
        console.log("Disconnected");
        ws = new WebSocket("wss://instrumentacionwifi.herokuapp.com");
      });
      // Connection opened
      ws.addEventListener("open", function(event) {
        console.log("Connected");
      });
      ws.addEventListener("message", function(event) {
        console.log(event);
        vm.handleRes(event.data);
      });
    },
    handleRes(ev) {
      const separador = ":::";
      let type = ev.split(separador)[1];
      let value = ev.split(separador)[2];
      switch (type) {
        case "TLM35":
          this.tLM35 = value;
          break;
        case "TDHT11":
          this.tDHT = value;
          break;
        case "TBMP180":
          this.tBMP = value;
          break;
        case "HFC28":
          this.hFC28 = value;
          break;
        case "HDHT11":
          this.hDHT = value;
          break;
        case "PBMP180":
          this.pBMP = value;
          break;
        default:
          console.log('No identificado',ev)
      }
    }
  },
  mounted() {
    this.initWebsocket();
  },
  destroyed() {
    if (this.socket) this.socket.close();
  },
  computed: {
    meanTemperature() {
      return (this.tLM35 + this.tDHT + this.tBMP) / 3;
    },
    stdTemperature() {
      let std =
        (this.tLM35 - this.meanTemperature) ** 2 +
        (this.tBMP - this.meanTemperature) ** 2 +
        (this.tDHT - this.meanTemperature) ** 2;
      std = Math.sqrt(std);
      return std;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 90%;
  border: 1px solid #eee;
  box-shadow: 2px 5px 5px #777;
  margin: 1rem auto;
  border-radius: 10%;
  overflow: hidden;
  padding: 2rem 1rem;

  &__img {
    max-width: 100%;
  }
}

.card__table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

.card__table td,
.card__table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.card__table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.card__table tr:hover {
  background-color: #ddd;
}

.card__table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #397d5e;
  color: white;
}

.separator {
  margin-top: 3rem;
}

.sensors {
  padding-bottom: 5rem;
}
</style>
