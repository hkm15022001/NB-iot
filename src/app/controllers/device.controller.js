const apiResponse = require("../../utils/apiResponse");
const APIStatus = require("../../constants/APIStatus");
const {
  getAllDeviceDb,
  createDeviceDb,
  deleteDeviceDb,
  getDeviceDb
} = require("../../db/device.db");
//get all device
const getAllDevices = async (req, res, next) => {
  const _id = req.user._id;
  const devices = await getAllDeviceDb({ userId: _id });

  if (devices)
    return res
      .status(200)
      .json(apiResponse({ status: APIStatus.SUCCESS, data: devices }));
  else
    return res
      .status(404)
      .json(apiResponse({ status: APIStatus.FAIL, msg: "Device not found" }));
};
// GET('/:id')
const getDevice = async (req, res, next) => {
  const device = await getDeviceDb({ _id: req.params.id });

  // null nếu không tìm thấy
  if (device) {
    return res
      .status(200)
      .json(apiResponse({ status: APIStatus.SUCCESS, data: device }));
  } else
    return res
      .status(404)
      .json(apiResponse({ status: APIStatus.FAIL, msg: "Device not found" }));
};
// POST('/')
const createDevice = async (req, res, next) => {
  const userId = req.user._id, deviceName = req.body.deviceName;
  //console.log(deviceName);
  const device = await getDeviceDb({ deviceName});
  if (device)
    return res
      .status(400)
      .json(
        apiResponse({ status: APIStatus.FAIL, msg: "Trùng tên thiết bị" })
      );

  const rs = await createDeviceDb({ deviceName, userId });
  if(!rs) return res
      .status(400)
      .json(
        apiResponse({ status: APIStatus.FAIL, msg: "không thể tạo mới" })
      );
  return res
    .status(201)
    .json(apiResponse({ status: APIStatus.SUCCESS, data: rs }));
};

// DELETE(/:id)
const deleteDevice = async (req, res, next) => {
  const _id = req.params.id;

  const data = await getDeviceDb({ _id });
  if (!data)
    return res.status(400).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: "You don't have this device",
      })
    );

  const device = await deleteDeviceDb({ _id });

  if (device)
    return res.status(200).json(
      apiResponse({
        status: APIStatus.SUCCESS,
        msg: "Delete success this device",
        data: device,
      })
    );
};


module.exports = {
  getDevice,
  getAllDevices,
  createDevice,
  deleteDevice,
};
