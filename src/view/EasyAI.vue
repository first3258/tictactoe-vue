<template>
  <div>
    <canvas id="my-canvas"></canvas>
    <nav style="width: 100%">
      <div
        class="circle1"
        style="margin-top: 140px"
        @click="$router.push('/ai')"
      >
        <img src="../assets/icons/Backward.svg" alt="" />
      </div>

      <div style="width: 95%"></div>

      <div class="circle1" style="margin-top: 140px" @click="reloadPage">
        <img src="../assets/icons/restart.svg" alt="" />
      </div>
    </nav>

    <div class="Container">
      <h2>{{ status }}</h2>
      <div class="Table">
        <div @click="fillInCell(0)" id="cell_0"></div>
        <div @click="fillInCell(1)" id="cell_1"></div>
        <div @click="fillInCell(2)" id="cell_2"></div>
        <div @click="fillInCell(3)" id="cell_3"></div>
        <div @click="fillInCell(4)" id="cell_4"></div>
        <div @click="fillInCell(5)" id="cell_5"></div>
        <div @click="fillInCell(6)" id="cell_6"></div>
        <div @click="fillInCell(7)" id="cell_7"></div>
        <div @click="fillInCell(8)" id="cell_8"></div>
      </div>

      <div class="Background">
        <div class="circle"></div>
        <div class="x">
          <svg
            id="xicon"
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 0L0 100L100 200L0 300L100 400L200 300L300 400L395 300L300 200L400 100L300 0L200 100L100 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>

    <audio style="display: none" id="winaudio" controls>
      <source :src="require(`../assets/song/Win.mp3`)" type="audio/mp3" />
    </audio>
    <audio style="display: none" id="loseaudio" controls>
      <source :src="require(`../assets/song/Lose.mp3`)" type="audio/mp3" />
    </audio>
    <audio style="display: none" id="drawaudio" controls>
      <source :src="require(`../assets/song/Draw.mp3`)" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import ConfettiGenerator from "confetti-js";
export default {
  components: {},

  data() {
    return {
      activePlayer: this.$route.params.side,
      player: this.$route.params.side,
      status: "PLAYER VS AI Easy 👶",
      cells: [null, null, null, null, null, null, null, null, null],
      countClicks: 0,
      winningConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
      playerWin: "",
      playerLose: "",
      playerDraw: "",
      winner: null,
      arr: {
        player1: localStorage.getItem("PlayerName"),
        player2: "AI Easy",
        isWin: "",
      },
      obj: [],
    };
  },
  created() {
    var text = localStorage.getItem("history");
    this.obj = JSON.parse(text);
  },
  mounted() {
    var side = this.$route.params.side;
    console.log(side);
    var cu = document.getElementsByClassName("circle")[0];
    var xu = document.getElementById("xicon");

    if (side == "x") {
      xu.style.color = "#FC4A1A";
      xu.style.opacity = "1";
      xu.style.transform = "scale(1.5)";
      cu.style.backgroundColor = "#6649c4";
      cu.style.opacity = "0.2";
      cu.style.transform = "scale(1)";
    } else {
      cu.style.backgroundColor = "#FECD1A";
      cu.style.opacity = "1";
      cu.style.transform = "scale(1.5)";
      xu.style.color = "#6649c4";
      xu.style.opacity = "0.2";
      xu.style.transform = "scale(1)";
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    fillInCell: function (id) {
      let cellName = "cell_" + id;
      let cell = document.getElementById(cellName);
      var im = document.createElement("img");
      cell.style.pointerEvents = "none";
      cell.style.p;
      im.className = "Incell_" + id;
      im.style.height = "54px";
      im.style.width = "54px";
      im.style.position = "absolute";

      if (this.cells[id] == null) {
        this.countClicks += 1;
        if (this.activePlayer == "x") {
          im.src = require("@/assets/icons/X-red.svg");
          cell.appendChild(im);
        } else {
          im.src = require("@/assets/icons/O-yellow.svg");
          cell.appendChild(im);
        }

        this.cells[id] = this.activePlayer;

        var cu = document.getElementsByClassName("circle")[0];
        var xu = document.getElementById("xicon");

        if (this.activePlayer == "x") {
          cu.style.backgroundColor = "#FECD1A";
          cu.style.opacity = "1";
          cu.style.transform = "scale(1.5)";
          xu.style.color = "#6649c4";
          xu.style.opacity = "0.2";
          xu.style.transform = "scale(1)";
          this.status = "Turn O";
        } else {
          xu.style.color = "#FC4A1A";
          xu.style.opacity = "1";
          xu.style.transform = "scale(1.5)";
          cu.style.backgroundColor = "#6649c4";
          cu.style.opacity = "0.2";
          cu.style.transform = "scale(1)";
          this.status = "Turn X";
        }

        this.activePlayer = this.activePlayer == "x" ? "o" : "x";

        if (this.countClicks >= 5) this.checkGame();

        console.log(cellName);

        if (this.activePlayer != this.player || this.cells[id] == null) {
          this.dumbAI();
        }
      } else if (this.activePlayer != this.player || this.cells[id] == null) {
        let random = Math.floor(Math.random() * 9);
        this.fillInCell(random);
      }
    },
    checkGame: function () {
      let a1 = "";
      let b2 = "";
      let c3 = "";

      for (let i = 0; i <= 7; i++) {
        let winningCondition = this.winningConditions[i];
        let a = this.cells[winningCondition[0]];
        let b = this.cells[winningCondition[1]];
        let c = this.cells[winningCondition[2]];

        if (a == null || b == null || c == null) continue;
        if (a == b && b == c) {
          a1 = winningCondition[0];
          b2 = winningCondition[1];
          c3 = winningCondition[2];
          this.winner = a;
          break;
        }
      }

      let cellNamea1 = "cell_" + a1;
      let cella1 = document.getElementById(cellNamea1);

      let cellNameb2 = "cell_" + b2;
      let cellb2 = document.getElementById(cellNameb2);

      let cellNamec3 = "cell_" + c3;
      let cellc3 = document.getElementById(cellNamec3);

      console.log(cellNamea1);
      console.log(cellNameb2);
      console.log(cellNamec3);

      var tb = document.getElementsByClassName("Table")[0];
      var cu = document.getElementsByClassName("circle")[0];
      var xu = document.getElementById("xicon");
      var bg = document.getElementsByClassName("Background")[0];

      var confettiSettings = { target: "my-canvas" };
      var confetti = new ConfettiGenerator(confettiSettings);

      if (this.winner == "x" && this.winner != this.player) {
        xu.style.color = "#fff";
        xu.style.opacity = "1";
        xu.style.transform = "scale(1.5)";
        cu.style.opacity = "0";
        bg.style.background = "#FC4A1A";
        cella1.style.background = "#26D074";
        cellb2.style.background = "#26D074";
        cellc3.style.background = "#26D074";
        tb.style.pointerEvents = "none";

        document.getElementById("loseaudio").play();

        if (this.arr.isWin == "") {
          this.arr.isWin = "Lose";
          this.arr.bgColor = "backgroundColor:#FC4A1A";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }

        //localStorage.setItem("PlayerLoseEZ", parseInt(this.playerLose) + 1);
        this.status = "You're Loser";
        return true;
      } else if (this.winner == "o" && this.winner != this.player) {
        cu.style.backgroundColor = "#fff";
        cu.style.opacity = "1";
        cu.style.transform = "scale(1.5)";
        xu.style.opacity = "0";
        bg.style.background = "#FC4A1A";
        cella1.style.background = "#26D074";
        cellb2.style.background = "#26D074";
        cellc3.style.background = "#26D074";
        tb.style.pointerEvents = "none";
        document.getElementById("loseaudio").play();

        if (this.arr.isWin == "") {
          this.arr.isWin = "Lose";
          this.arr.bgColor = "backgroundColor:#FC4A1A";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }

        //localStorage.setItem("PlayerLoseEZ", parseInt(this.playerLose) + 1);
        //localStorage.setItem("PlayerLoseEZ", playerLose + 1);
        this.status = "You're Loser";
        return true;
      } else if (this.winner == "x" && this.winner == this.player) {
        xu.style.color = "#fff";
        xu.style.opacity = "1";
        xu.style.transform = "scale(1.5)";
        cu.style.opacity = "0";
        bg.style.background = "#26D074";
        cella1.style.background = "#26D074";
        cellb2.style.background = "#26D074";
        cellc3.style.background = "#26D074";
        tb.style.pointerEvents = "none";

        document.getElementById("winaudio").play();
        confetti.render();

        if (this.arr.isWin == "") {
          this.arr.isWin = "Win";
          this.arr.bgColor = "backgroundColor:#26D074";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }

        //localStorage.setItem("PlayerWinEZ", parseInt(this.playerWin) + 1);
        //localStorage.setItem("PlayerWinEZ", playerWin);
        this.status = "You Won";
        return true;
      } else if (this.winner == "o" && this.winner == this.player) {
        cu.style.backgroundColor = "#fff";
        cu.style.opacity = "1";
        cu.style.transform = "scale(1.5)";
        xu.style.opacity = "0";
        bg.style.background = "#26D074";
        cella1.style.background = "#26D074";
        cellb2.style.background = "#26D074";
        cellc3.style.background = "#26D074";
        tb.style.pointerEvents = "none";

        document.getElementById("winaudio").play();
        confetti.render();
        //var beforego = playerWin + 1;
        console.log(this.playerWin);

        if (this.arr.isWin == "") {
          this.arr.isWin = "Win";
          this.arr.bgColor = "backgroundColor:#26D074";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }

        //localStorage.setItem("PlayerWinEZ", parseInt(this.playerWin) + 1);
        this.status = "You Won";
        return true;
      } else {
        if (this.countClicks == 9) {
          cu.style.backgroundColor = "#fff";
          cu.style.opacity = "1";
          cu.style.transform = "scale(1)";
          xu.style.color = "#fff";
          xu.style.opacity = "1";
          xu.style.transform = "scale(1)";
          bg.style.background = "#06116C";
          tb.style.pointerEvents = "none";

          if (this.arr.isWin == "") {
            this.arr.isWin = "Draw";
            this.arr.bgColor = "backgroundColor:#06116C";
            this.obj.push(this.arr);
            const myJSON = JSON.stringify(this.obj);
            localStorage.setItem("history", myJSON);
          }
          document.getElementById("drawaudio").play();

          //localStorage.setItem("PlayerDrawEZ", parseInt(this.playerDraw) + 1);
          this.status = "DRAW";
          return true;
        }
      }
      console.log(this.obj);
      return;
    },
    dumbAI: function () {
      let random = Math.floor(Math.random() * 9);

      if (!this.checkGame()) {
        setTimeout(() => {
          this.fillInCell(random);
        }, 500);
      }
    },

    replay: function () {
      location.reload();
    },
  },
  computed: {},
};
</script>

<style scoped>
#my-canvas {
  position: absolute;
  top: 0;
}
.Container {
  display: flex;
  justify-content: center;
}

.Container h2 {
  color: #fff;
  font-size: 48px;
  margin-top: 90px;
  margin-bottom: 100px;
}

.Table {
  display: grid;
  grid-template-columns: repeat(3, auto);
  position: absolute;
  padding: 10px;
  margin: 200px auto;
  width: 388px;
  height: 388px;
  background: #6649c4;
  box-shadow: 16px 22px 57px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
}

.Table div {
  border-radius: 10px;
  background: #332167;
  margin: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.Table div:hover {
  background-color: #fff;
}

/* BackGround */

.Background {
  position: fixed;
  background: #332167;
  width: 100%;
  height: 100%;
  z-index: -10;
}

.circle {
  position: absolute;
  bottom: calc(100vh - 40%);
  right: calc(100vw - 20%);
  height: 560px;
  width: 560px;
  background-color: #6649c4;
  border-radius: 50%;
  opacity: 0.2;
  transition-duration: 500ms;
}

.x {
  position: absolute;
  top: calc(100vh - 40%);
  left: calc(100vw - 20%);

  transition-duration: 500ms;
}

.x #xicon {
  color: #6649c4;
  transition-duration: 500ms;
  opacity: 0.2;
}

nav {
  display: flex;
  align-items: center;

  position: absolute;
  height: 5vh;
  border-radius: 50%;
  padding: 0 2% 0 2%;
}

.circle1 {
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

.circle1:hover {
  border: 2px solid rgba(249, 249, 249, 0.8);
  transform: scale(1.1);
}
</style>
