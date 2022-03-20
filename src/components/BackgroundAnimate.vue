<template>
  <div class="Container" :style="bg">
    <div class="circle"></div>
    <div class="x">
      <svg
        width="800"
        height="800"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 0L0 100L100 200L0 300L100 400L200 300L300 400L395 300L300 200L400 100L300 0L200 100L100 0Z"
          fill="currentcolor"
        />
      </svg>
    </div>
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
  bottom: calc(100vh - 50%);
  right: calc(100vw - 30%);
  height: 720px;
  width: 720px;
  background-color: #6649c4;
  border-radius: 50%;
  opacity: 0.2;
  transition-duration: 500ms;
  z-index: 1;
  animation: alternate infinite;
  animation-name: moveframesO;
  animation-duration: 3s;
}

/* .circle:hover {
  transform: scale(1.5);
  z-index: 1;
} */

.x {
  position: absolute;
  top: calc(100vh - 50%);
  left: calc(100vw - 30%);
  color: #6649c4;
  opacity: 0.2;
  z-index: 1;
  transition-duration: 500ms;
  animation: alternate infinite;
  animation-name: moveframesX;
  animation-duration: 3s;
}

/* .x:hover {
  transform: scale(1.5);
  z-index: 1;
} */

@keyframes moveframesX {
  from {
    transform: scale(1.3);
    opacity: 1;
    color: #fc4a1a;
  }

  to {
  }
}

@keyframes moveframesO {
  from {
  }

  to {
    transform: scale(1.2);
    opacity: 1;
    background-color: #fecd1a;
  }
}
</style>
