require("dotenv").config(require("./config/dotenv"));

const express = require("express");
const apiResponse = require("./utils/apiResponse");
const APIStatus = require("./constants/APIStatus");
const db = require("./db/mongoose");
const cors = require("cors");
const route = require("./routes");
const app = express();
require("./services/mqtt.service");

// Parse body req to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());

// Route middleware
route(app);

// Handle exception
app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.statusCode || 500).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: "validation failed",
        data: err,
      })
    );
  }

  console.log(err);
  return res
    .status(500)
    .json(
      apiResponse({ status: APIStatus.ERROR, msg: "Internal Server error" })
    );
});

//Connect to mongodb database
(async () => {
  try {
    await db.connection();
    const PORT = process.env.PORT || 8080;
    const HOST_NAME = process.env.HOST_NAME || "localhost";
    app.listen(PORT, HOST_NAME,() => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(">> Error to db: ",error)};
})();
