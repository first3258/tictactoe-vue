<template>
  <div class="Container" :style="bg">
    <div class="circle"></div>
    <div class="x"><img src="../assets/icons/X.svg" /></div>
  </div>
</template>

<script>
export default {
  name: "Background",
  props: ["backgroundColor"],

  data() {
    return {
      bg: "background-color : " + this.backgroundColor + ";",
    };
  },
};
</script>

<style scoped>
.Container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -10;
}

.circle {
  position: absolute;
  bottom: calc(100vh - 40%);
  right: calc(100vw - 20%);
  height: 720px;
  width: 720px;
  background-color: #6649c4;
  border-radius: 50%;
  opacity: 0.2;
  transition-duration: 500ms;
}

.circle:hover {
  transform: scale(1.5);
}

.x {
  position: absolute;
  top: calc(100vh - 40%);
  left: calc(100vw - 20%);

  color: #6649c4;
  opacity: 0.2;

  transition-duration: 500ms;
}

.x:hover {
  transform: scale(1.5);
}
</style>
