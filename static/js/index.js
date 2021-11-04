import { Router } from "./router.js";
import { createApp } from "./utils.js";
const initWebsite = function () {
  const router = new Router();
  router.init();
  if (document.body.children.length === 0) {
    createApp();
  }
  console.log("initWebsite")
};

window.onload = initWebsite;
