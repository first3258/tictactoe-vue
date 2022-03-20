<template>
  <div id="app">
    <router-view />
    <audio style="display: none" id="myaudio" autoplay loop controls>
      <source
        :src="require(`./assets/song/Hau'oli City.mp3`)"
        type="audio/mp3"
      />
    </audio>
    
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    document.getElementById("app").addEventListener("mousemove", () => {
      document.getElementById("myaudio").play();
      document.getElementById("myaudio").volume = 0.15;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
}
</style>
