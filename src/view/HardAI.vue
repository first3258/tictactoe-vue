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
        <div @click="move('0', huPlayer)" id="cell_0"></div>
        <div @click="move('1', huPlayer)" id="cell_1"></div>
        <div @click="move('2', huPlayer)" id="cell_2"></div>
        <div @click="move('3', huPlayer)" id="cell_3"></div>
        <div @click="move('4', huPlayer)" id="cell_4"></div>
        <div @click="move('5', huPlayer)" id="cell_5"></div>
        <div @click="move('6', huPlayer)" id="cell_6"></div>
        <div @click="move('7', huPlayer)" id="cell_7"></div>
        <div @click="move('8', huPlayer)" id="cell_8"></div>
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
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      huPlayer: "",
      aiPlayer: "",
      status: "Player vs Demon 👿",
      iter: 0,
      round: 0,
      cells: [null, null, null, null, null, null, null, null, null],
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
      winner: null,
      arr: {
        player1: localStorage.getItem("PlayerName"),
        player2: "Demon",
        isWin: "",
        bgColor: "",
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
    this.huPlayer = this.$route.params.side;

    if (this.$route.params.side === "x") {
      this.aiPlayer = "o";
    } else if (this.$route.params.side === "o") {
      this.aiPlayer = "x";
    }

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

        this.status = "You're Loser";
        if (this.arr.isWin == "") {
          this.arr.isWin = "Lose";
          this.arr.bgColor = "backgroundColor:#FC4A1A";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }
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
        this.status = "You're Loser";
        if (this.arr.isWin == "") {
          this.arr.isWin = "Lose";
          this.arr.bgColor = "backgroundColor:#FC4A1A";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }
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
        if (this.arr.isWin == "") {
          this.arr.isWin = "Win";
          this.arr.bgColor = "backgroundColor:#26D074";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }
        document.getElementById("winaudio").play();
        confetti.render();
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
        if (this.arr.isWin == "") {
          this.arr.isWin = "Win";
          this.arr.bgColor = "backgroundColor:#26D074";
          this.obj.push(this.arr);
          const myJSON = JSON.stringify(this.obj);
          localStorage.setItem("history", myJSON);
        }
        document.getElementById("winaudio").play();
        console.log(this.playerWin);
        confetti.render();

        this.status = "You Won";
        return true;
      } else {
        if (this.round == 9) {
          cu.style.backgroundColor = "#fff";
          cu.style.opacity = "1";
          cu.style.transform = "scale(1)";
          xu.style.color = "#fff";
          xu.style.opacity = "1";
          xu.style.transform = "scale(1)";
          bg.style.background = "#06116C";
          tb.style.pointerEvents = "none";
          document.getElementById("drawaudio").play();

          if (this.arr.isWin == "") {
            this.arr.isWin = "Draw";
            this.arr.bgColor = "backgroundColor:#06116C";
            this.obj.push(this.arr);
            const myJSON = JSON.stringify(this.obj);
            localStorage.setItem("history", myJSON);
          }
          this.status = "DRAW";
          return true;
        }
      }

      return;
    },

    move: function (element, player) {
      var cu = document.getElementsByClassName("circle")[0];
      var xu = document.getElementById("xicon");
      let cellName = "cell_" + element;
      let cell = document.getElementById(cellName);
      cell.style.pointerEvents = "none";
      cell.style.p;
      var im = document.createElement("img");
      im.className = "Incell_" + element;
      im.style.height = "54px";
      im.style.width = "54px";
      im.style.position = "absolute";

      console.log(element, player);

      if (this.board[element] != "x" && this.board[element] != "o") {
        this.round++;

        //Player = o
        if (!this.winning(this.board, this.huPlayer)) {
          if (this.huPlayer === "x") {
            im.src = require("@/assets/icons/X-red.svg");
            cu.style.backgroundColor = "#FECD1A";
            cu.style.opacity = "1";
            cu.style.transform = "scale(1.5)";
            xu.style.color = "#6649c4";
            xu.style.opacity = "0.2";
            xu.style.transform = "scale(1)";
            this.status = "Turn O";
          } else if (this.huPlayer === "o") {
            im.src = require("@/assets/icons/O-yellow.svg");
            xu.style.color = "#FC4A1A";
            xu.style.opacity = "1";
            xu.style.transform = "scale(1.5)";
            cu.style.backgroundColor = "#6649c4";
            cu.style.opacity = "0.2";
            cu.style.transform = "scale(1)";
            this.status = "Turn X";
          }

          cell.appendChild(im);
        }

        //
        this.board[element] = this.huPlayer;
        this.cells[element] = this.huPlayer;

        //console.log(this.board)

        //
        if (this.winning(this.board, this.huPlaye)) {
          this.checkGame();
          return;
        } else if (this.round > 8) {
          this.checkGame();
        } else {
          this.round++;

          let index = this.minimax(this.board, this.aiPlayer).index;
          console.log(index);

          let cellNameAi = "cell_" + index;
          let cellAi = document.getElementById(cellNameAi);
          cellAi.style.pointerEvents = "none";
          cellAi.style.p;

          //Ai Player
          this.cells[index] = this.aiPlayer;
          this.board[index] = this.aiPlayer;

          //console.log(this.board)

          //Ai Player
          setTimeout(() => {
            let imAi = document.createElement("img");
            imAi.className = "Incell_" + index;
            imAi.style.height = "54px";
            imAi.style.width = "54px";
            imAi.style.position = "absolute";
            if (this.aiPlayer === "x") {
              imAi.src = require("@/assets/icons/X-red.svg");
              cu.style.backgroundColor = "#FECD1A";
              cu.style.opacity = "1";
              cu.style.transform = "scale(1.5)";
              xu.style.color = "#6649c4";
              xu.style.opacity = "0.2";
              xu.style.transform = "scale(1)";
              this.status = "Turn O";
            } else if (this.aiPlayer === "o") {
              imAi.src = require("@/assets/icons/O-yellow.svg");
              xu.style.color = "#FC4A1A";
              xu.style.opacity = "1";
              xu.style.transform = "scale(1.5)";
              cu.style.backgroundColor = "#6649c4";
              cu.style.opacity = "0.2";
              cu.style.transform = "scale(1)";
              this.status = "Turn X";
            }
            cellAi.appendChild(imAi);

            this.checkGame();
          }, 1000);
        }
        console.log(this.cells);
      }
    },

    winning: function (board, player) {
      if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
      ) {
        return true;
      } else {
        return false;
      }
    },

    avail: function (reboard) {
      return reboard.filter((s) => s != "x" && s != "o");
    },

    minimax: function (reboard, player) {
      this.iter++;
      let array = this.avail(reboard);

      if (this.winning(reboard, this.huPlayer)) {
        return {
          score: -10,
        };
      } else if (this.winning(reboard, this.aiPlayer)) {
        return {
          score: 10,
        };
      } else if (array.length === 0) {
        return {
          score: 0,
        };
      }

      let moves = [];
      for (let i = 0; i < array.length; i++) {
        let move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == this.aiPlayer) {
          let g = this.minimax(reboard, this.huPlayer);
          move.score = g.score;
        } else {
          let g = this.minimax(reboard, this.aiPlayer);
          move.score = g.score;
        }

        reboard[array[i]] = move.index;
        moves.push(move);
      }

      let bestMove;
      if (player == this.aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
            if (i == bestMove);
          }
        }
      }
      return moves[bestMove];
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
