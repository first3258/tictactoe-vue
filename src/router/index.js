import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../view/Home.vue";
import Playzone from "../view/playzone.vue";
import Bot from "../view/Bot.vue";
import chooseTokenEasy from "../view/chooseTokenEasy.vue";
import chooseTokenHard from "../view/chooseTokenHard.vue";
import name from "../view/name.vue";
import easyAi from "../view/EasyAI.vue";
import hardAi from "../view/HardAI.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ai",
    component: Bot,
  },
  {
    path: "/playzone",
    component: Playzone,
  },
  {
    path: "/chooseTokeneasy",
    component: chooseTokenEasy,
  },
  {
    path: "/chooseTokenhard",
    component: chooseTokenHard,
  },
  {
    path: "/name",
    component: name,
  },
  {
    path: "/botez/:side",
    component: easyAi,
  },
  {
    path: "/bothard/:side",
    component: hardAi,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
