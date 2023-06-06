const router = require("express").Router();
const { authUser, authAdmin } = require("../middlewares/auth.middleware");
const asyncWrap = require("../utils/asyncWrap");
// const { createDeviceValidation } = require('../validations/device.validation');
const {
  getDeviceDataRealTime,
  getDeviceDataRange,
  insertDeviceData,
} = require("../app/controllers/data.controller");


router.get("/:id", authUser, asyncWrap(getDeviceDataRealTime));
router.post("/:id/get-data", authUser, asyncWrap(getDeviceDataRange));
router.post("/push-data", authUser, asyncWrap(insertDeviceData));

module.exports = router;
