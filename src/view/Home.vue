<template>
  <div>
    <Background backgroundColor="#332167" />

    <div style="width: 100%">
      <div class="header">
        <h1 style="font-size: 70px; margin: 0">Tic-Tac-Toe</h1>
        <h1 style="font-size: 50px; margin: 0">Zachary</h1>
      </div>
      <div class="button-group">
        <div class="button-top" @click="$router.push('/ai')">
          <h1>🤖</h1>
          <h1 style="margin-left: 50px">P1 VS AI</h1>
        </div>
        <div class="button-bottom" @click="$router.push('/name')">
          <h1>🧑‍🤝‍🧑</h1>
          <h1 style="margin-left: 50px">P1 VS P2</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from "../components/BackgroundAnimate.vue";
export default {
  name: "Home",
  components: {
    Background,
  },
};
</script>

<style scoped>
.header {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 10%;
  color: white;
}

.button-group {
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-top {
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

.button-top:hover {
  transform: scale(1.1);
}

.button-bottom {
  transition-duration: 250ms;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 372px;
  height: 95px;
  background-color: #6649c4;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
}

.button-bottom:hover {
  transform: scale(1.1);
}
</style>
