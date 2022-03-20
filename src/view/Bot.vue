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

      <div v-for="o in var1" class="wrap" :style="o.bgColor" :key="o">
        <p style="width: 100px; font-weight: bold">{{ o.player1 }}</p>
        <p style="width: 40px; text-align: center; font-weight: bold">
          {{ o.isWin }}
        </p>
        <p style="width: 100px; text-align: right; font-weight: bold">
          {{ o.player2 }}
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
      <h1 class="text" style="margin-bottom: 50px">AI Dificulty</h1>

      <button id="button-easy" class="button-easy" v-on:click="click">
        <img class="ai" src="../assets/icons/Easy.png" />
        <h1 style="margin-left: 50px">Easy</h1>
      </button>

      <button id="button-hard" class="button-hard" v-on:click="click">
        <img class="ai" src="../assets/icons/Hard.png" />
        <h1 style="margin-left: 50px">Hard</h1>
      </button>

      <div>
        <p style="font-size: 24px; color: #ffff; padding: 10px 0">
          Enter your name
        </p>
        <input type="text" placeholder="Name : " v-model="name" required />
      </div>

      <div class="start" @click="gameStart">
        <p style="font-size: 24px">Start</p>
      </div>
    </div>
  </div>
</template>

<script>
import Background from "../components/Background.vue";
export default {
  name: "Bot",
  components: {
    Background,
  },

  data() {
    return {
      level: "",
      name: "",
      havaname: "",
      checkName: false,
      checkHistory: false,
      history: "",
      var1: [],
    };
  },
  mounted() {
    if (localStorage.getItem("history") === null) {
      this.var1 = {
        player1: "",
        isWin: "",
        player2: "",
      };
      console.log(this.var1);
    } else {
      this.history = JSON.parse(localStorage.getItem("history"));
      if (this.history.length > 6) {
        for (let i = 0; i < 5; i++) {
          this.var1[i] = this.history.pop();
        }
      } else {
        this.var1 = this.history;
      }

      console.log(this.var1);
    }

    localStorage.removeItem("PlayerName");

    if (!localStorage.getItem("history")) {
      const arr = [];
      localStorage.setItem("history", arr);
    }
  },
  methods: {
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

    click() {
      const buttonEasy = document.getElementById("button-easy");
      const buttonHard = document.getElementById("button-hard");

      buttonEasy.addEventListener("click", () => {
        buttonEasy.style.border = "5px solid #00FFFF";
        buttonHard.style.border = "";
        this.level = "easy";
      });

      buttonHard.addEventListener("click", () => {
        buttonHard.style.border = "5px solid #00FFFF";
        buttonEasy.style.border = "";
        this.level = "hard";
      });
    },

    gameStart() {
      if (this.level === "") {
        alert("Please Choosen AI Level");
      } else if (
        this.name === "" &&
        localStorage.getItem("PlayerName") === null
      ) {
        alert("Please Enter Your Name");
      } else if (localStorage.getItem("PlayerName") !== null) {
        if (this.level === "easy") {
          this.$router.push("/chooseTokeneasy");
        } else if (this.level === "hard") {
          this.$router.push("/chooseTokenhard");
        }
      } else if (
        this.name !== "" &&
        localStorage.getItem("PlayerName") === null
      ) {
        if (this.level === "easy") {
          localStorage.setItem("PlayerName", this.name);

          this.$router.push("/chooseTokeneasy");
        } else if (this.level === "hard") {
          localStorage.setItem("PlayerName", this.name);

          this.$router.push("/chooseTokenhard");
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  color: white;
}

.text {
  font-size: 64px;
  margin-bottom: 30px;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  border-radius: 50%;
  padding: 5% 2% 0 2%;
}

.history {
  width: 50px;
  height: 50px;
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
  height: calc(100vh - 15vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#button-easy {
  cursor: pointer;
  transition-duration: 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 372px;
  height: 95px;
  background-color: #6649c4;
  border-radius: 20px;
  outline: none;
  color: white;
  font-weight: bold;
  margin-bottom: 50px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  border: none;
}

#button-hard {
  border: none;
  cursor: pointer;
  transition-duration: 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 372px;
  height: 95px;
  background-color: #6649c4;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 50px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
}

.button-start {
  width: 372px;
  height: 95px;
}

input {
  width: 379px;
  height: 72px;
  border-radius: 20px;
  font-size: 24px;
  color: #646464;
  border: 5px solid rgba(117, 116, 116, 0.8);
  outline: none;
  text-align: center;
  font-weight: bold;
}

.start {
  cursor: pointer;
  width: 200px;
  height: 50px;
  background-color: #fecd1a;
  margin-top: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
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
