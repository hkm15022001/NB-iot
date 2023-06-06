const {Device,Data} = require("../app/models/device.model");


// Get all device of user
const getAllDeviceDb = async (query) => {
  try {
    const [totalDevices, devices] = await Promise.all([
      Device.find(query).count(),
      Device.find(query),
    ]);
    //console.log(totalDevices, devices);
    return {
      devices,
      totalDevices,
    };
  } catch (error) {
    console.log(error);
    return "error when get all device";
  }
};

// Get one device
const getDeviceDb = async (query) => {
  try {
    //console.log(query)
    const device = await Device.findOne(query);
    return device;
  } catch (error) {
    console.log(error);
  }
};


// Create one device
const createDeviceDb = async (query) => {
  try {
    const device = await new Device(query).save();
    return device;
  } catch (error) {
    console.log(error);
  }
};

// Delete device
const deleteDeviceDb = async (query) => {
  const rs = await Device(query).delete();

  return rs;
};

module.exports = {
  getAllDeviceDb,
  createDeviceDb,
  deleteDeviceDb,
  getDeviceDb
};
