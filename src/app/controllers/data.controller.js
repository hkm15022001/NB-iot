const apiResponse = require("../../utils/apiResponse");
const APIStatus = require("../../constants/APIStatus");
const {
  getDeviceDataDb,
  getDeviceDataRangeDb,
  insertDataDeviceDb,
} = require("../../db/data.db");


// Get Device Data realtime
const getDeviceDataRealTime = async (req, res, next) => {
  //const _id = req.user._id;
  const deviceId =req.params.id;
  const data = await getDeviceDataDb(deviceId);

  return res
    .status(200)
    .json(apiResponse({ status: APIStatus.SUCCESS, data: { ...data } }));
};

// Get data Device range
const getDeviceDataRange = async (req, res, next) => {
  const deviceId = req.params.id;
  const {
    begin_month,
    begin_day,
    begin_hour,
    begin_minute,
    end_month,
    end_day,
    end_hour,
    end_minute,
  } = req.body;
  //ngày bắt đầu
  let dateBegin = moment({
    month: begin_month,
    date: begin_day,
    hour: begin_hour,
    minute: begin_minute,
  });
  //ngày kết thúc
  let dateEnd = moment({
    month: end_month,
    date: end_day,
    hour: end_hour,
    minute: end_minute,
  });
  //tính khoảng cách hai mốc thời gian
  let start = dateBegin.valueOf();
  let end = dateEnd.valueOf();
  let range = end - start;
  let miniRange = range / 20; //20 khoảng thời gian

  const rs = await getDeviceDataRangeDb({deviceId, dateBegin, dateEnd, miniRange });
  return res.status(204).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: "Get data Device success",
      data: rs,
    })
  );
};

// insert 1 data
const insertDeviceData = async (req, res, next) => {
  const { deviceId,rsrp,rsrq,sinr,cellId,longitude,latitude } = req.body;
  // const humidityAir = Math.floor(Math.random() * (100 - 80 + 1) + 80);
  // const temperature = Math.floor(Math.random() * (30 - 15 + 1) + 15);
  // kiểm tra subscriber đã có chưa

  const rs = await insertDataDeviceDb({ deviceId,rsrp,rsrq,sinr,cellId,longitude,latitude });

  return res.status(200).json(
    apiResponse({
      status: APIStatus.SUCCESS,
      msg: "Thêm mới thành công",
      data: rs,
    })
  );
};

module.exports = {
  getDeviceDataRealTime,
  getDeviceDataRange,
  insertDeviceData,
};
