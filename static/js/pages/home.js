function setup() {
  console.log("this is home page");

  const app = document.getElementById("app");

  app.innerHTML = `
  <div>HOME PAGE</div>
  `;
}

export default {
  setup,
};
