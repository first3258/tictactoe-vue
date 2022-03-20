<template>
  <div class="Container">
    <nav>
      <div>
        <div class="circle1" @click="$router.push('/ai')">
          <img src="../assets/icons/Backward.svg" alt="" />
        </div>
      </div>
    </nav>

    <div class="content">
      <h1 style="font-size: 64px; margin-top: 2vh">Select your Token</h1>

      <div class="xo">
        <div class="circle" @click="click"></div>
        <!-- <div class="close"></div> -->
        <div id="x" @click="click">
          <svg
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
  </div>
</template>

<script>
export default {
  name: "chooseToken",

  data() {
    return {};
  },

  methods: {
    click() {
      const selectC = document.getElementsByClassName("circle")[0];
      const selectX = document.getElementById("x");

      selectC.addEventListener("click", () => {
        this.$router.push("/botez/o");
      });

      selectX.addEventListener("click", () => {
        console.log("X");
        this.$router.push("/botez/x");
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
}

.circle {
  height: 400px;
  width: 400px;
  /* position: absolute;
    bottom: calc(20vh);
    right: calc(60vw); */
  background-color: #737373;
  border-radius: 50%;
  transition-duration: 500ms;
  cursor: pointer;
}

.circle:hover {
  background-color: #fecd1a;
}

#x {
  /* position: absolute;
    top: calc(25vh);
    left: calc(60vw); */
  transition-duration: 500ms;
}

svg {
  color: #737373;
  transition-duration: 500ms;
  cursor: pointer;
}

svg:hover {
  color: #fc4a1a;
}

.Container {
  position: fixed;
  background-color: #332167;
  width: 100%;
  height: 100%;
  z-index: -10;
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

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.xo {
  width: 100%;
  height: calc(100vh - 30vh);
  display: flex;
  justify-content: space-between;
  padding: 0 18vw;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  border-radius: 50%;
  padding: 5% 2% 0 2%;
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
