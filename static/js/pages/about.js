function setup() {
  console.log("this is about page");

  const app = document.getElementById("app");

  app.innerHTML = `
  <div>ABOUT PAGE</div>
`;
}

export default {
  setup,
};
