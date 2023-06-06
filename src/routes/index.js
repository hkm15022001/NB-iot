const authRouter = require("./auth.route");
const deviceRouter =require("./device.router");
const dataRouter = require("./data.route");
//Index of route middleware
const route = (app) => {
  // Route middleware auth
  app.use("/api/v1/auth", authRouter);
  // Route device
  app.use("/api/v1/device", deviceRouter);
  //Route data
  app.use("/api/v1/data", dataRouter);
};

module.exports = route;
