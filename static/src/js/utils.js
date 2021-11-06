export const createApp = function (style) {
  const app = document.createElement("div");
  app.setAttribute("id", "app");
  app.setAttribute("class", style || "flex-center");
  document.body.appendChild(app);
};

export const useSetup = function (module) {
  module.default.setup();
};
