<template>
  <div>
    <div class="history-b" v-show="checkHistory">
      <div class="close">
        <div class="circle" id="close" v-on:click="historyButtonClose">
          <img src="../assets/icons/close.svg" width="30px" height="30px" />
        </div>
        <h1
          style="
            color: white;
            text-align: center;

            font-size: 64px;
          "
        >
          History
        </h1>
        <div style="width: 50px"></div>
      </div>
      <div style="margin: 30px 0"></div>

      <div class="wrap" v-for="o in var1" :key="o" :style="o.bgColor">
        <p style="width: 100px; color: #fff; font-weight: bold">
          {{ o.playerW }}
        </p>
        <p
          style="
            width: 40px;
            text-align: center;
            color: #fff;
            font-weight: bold;
          "
        >
          {{ o.isWin }}
        </p>
        <p
          style="
            width: 100px;
            text-align: right;
            color: #fff;
            font-weight: bold;
          "
        >
          {{ o.playerL }}
        </p>
      </div>
    </div>

    <Background backgroundColor="#332167" />

    <!-- แถบบน -->
    <nav>
      <div>
        <div class="circle" @click="$router.push('/')">
          <img src="../assets/icons/Backward.svg" alt="" />
        </div>
      </div>

      <div>
        <div class="circle" id="history-button" v-on:click="historyButton">
          <img class="history" src="../assets/icons/History.png" alt="" />
        </div>
      </div>
    </nav>

    <div class="content">
      <div>
        <div class="header">
          <h1
            style="
              font-size: 64px;
              margin: 0;
              margin-bottom: 37px;
              color: white;
            "
          >
            Enter your name
          </h1>
        </div>
      </div>

      <div style="display: flex">
        <img :src="require(`../assets/icons/X-red.svg`)" style="width: 50px" />
        <input
          type="text"
          placeholder="Player1"
          v-model="p1"
          style="margin-left: 30px"
        />
      </div>
      <div class="tab" style="display: flex">
        <img
          :src="require(`../assets/icons/O-yellow.svg`)"
          style="width: 50px"
        />
        <input
          type="text"
          placeholder="Player2"
          v-model="p2"
          style="margin-left: 30px"
        />
      </div>

      <div class="start" @click="gameStart">
        <p style="font-size: 24px; color: white">Start</p>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import Background from "../components/Background.vue";
export default {
  name: "ai-diff",
  components: {
    Background,
  },
  data() {
    return {
      p1: "",
      p2: "",
      checkHistory: false,
      history: "",
      var1: [],
    };
  },

  methods: {
    gameStart() {
      localStorage.setItem("Player1", this.p1);
      localStorage.setItem("Player2", this.p2);

      if (this.p1 === "" && this.p2 === "") {
        alert("Please Enter Player Name ");
      } else if (this.p1 === "") {
        alert("Please Enter Player1 Name ");
      } else if (this.p2 === "") {
        alert("Please Enter Player2 Name ");
      } else {
        this.$router.push("/playzone");
      }
    },
    historyButton() {
      const buttonHistory = document.getElementById("history-button");

      buttonHistory.addEventListener("click", () => {
        this.checkHistory = true;
      });
    },

    historyButtonClose() {
      const buttonHistory = document.getElementById("close");
      buttonHistory.addEventListener("click", () => {
        this.checkHistory = false;
      });
    },
  },
  mounted() {
    localStorage.removeItem("Player1");
    localStorage.removeItem("Player2");
    if (localStorage.getItem("historyPvP") === null) {
      this.var1 = {
        player1: "",
        isWin: "",
        player2: "",
      };
      console.log(this.var1);
    } else {
      this.history = JSON.parse(localStorage.getItem("historyPvP"));
      if (this.history.length > 6) {
        for (let i = 0; i < 5; i++) {
          this.var1[i] = this.history.pop();
        }
      } else {
        this.var1 = this.history;
      }

      console.log(this.var1);
    }
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  border-radius: 50%;
  padding: 5% 2% 0 2%;
}

.circle {
  height: 71px;
  width: 71px;
  background-color: #6649c4;
  border-radius: 50%;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 500ms;
  cursor: pointer;
}

.circle:hover {
  border: 2px solid rgba(249, 249, 249, 0.8);
  transform: scale(1.1);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab {
  margin-top: 57px;
}

.header {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 0px;
  padding-top: 10%;
  color: white;
}

.button-start {
  width: 372px;
  height: 95px;
}

input {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 14px;
  font-size: 24px;
  color: #646464;
  border: 5px solid rgba(117, 116, 116, 0.8);
  outline: none;
}

.start {
  cursor: pointer;
  width: 200px;
  height: 50px;
  background-color: #fecd1a;
  margin-top: 37px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: bold;
  transition-duration: 250ms;
}

.start:hover {
  transform: scale(1.1);
}

.history-b {
  position: absolute;
  padding: 20px 20px 40px 20px;

  width: 70vw;
  height: 80vh;
  top: 10vh;
  left: 15vw;
  background-color: #4d3c85;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrap {
  font-size: 24px;
  width: 1045px;
  height: 115px;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
}

.close {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 50px;
}
</style>
