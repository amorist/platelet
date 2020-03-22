const Store = require("electron-store");

const schema = {
  hitokoto: {
    type: "number",
    minimum: 3000,
    default: 3000
  }
};

const store = new Store({ schema });
