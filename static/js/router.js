import { createApp, useSetup } from "./utils.js";

/**
 * Router 类
 * 1. routes  包含一个路由表(hashmap)，前进时候调用获取cb
 */
export class Router {
  constructor() {
    this.routes = new Map();
    this.current = "/";
  }
  init() {
    this.addRoute("home", () => import("./pages/home.js").then(useSetup));
    this.addRoute("about", () => import("./pages/about.js").then(useSetup));
    // this.addRoute("home", async () => console.log(import ("./home.js")))
    // this.addRoute("about", async () => console.log(import ("./about.js")))
    if (
      Array.from(document.body.children).findIndex(
        (element) => element.getAttribute("id") === "app"
      ) === -1
    ) {
      createApp();
    }
    if (window.location.pathname === "/") {
      this.push("home");
    } else {
      this.push(window.location.pathname.slice(1));
    }
    window._router = this;
  }
  /**
   *
   * @param {string} path
   * @param {Function} cb
   */
  addRoute(path, cb) {
    this.routes.set(path, cb || function () {});
  }
  _clearApp() {
    const app = document.getElementById("app");
    app.parentNode.removeChild(app);
    createApp();
  }
  push(path) {
    this._clearApp();
    // window.onpopstate = this.routes.get(path);
    window.history.pushState(null, null, path);
    // window.onpopstate = null;
    this.routes.get(path)();
  }
}
