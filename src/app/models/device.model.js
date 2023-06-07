const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment-timezone');
const timezone = require('mongoose-timezone');

mongoose.plugin(timezone, {
  paths: ['createdDate', 'modifiedDate'], // Các trường ngày tháng muốn chuyển đổi
  //useNativeMongoDate: true, // Sử dụng ngày tháng MongoDB gốc
});

const dataSchema = new mongoose.Schema(
  {
    deviceId:{
      type : String
    },
    rsrp: {
      type: Number,
      default: 0,
    },
    rsrq: {
      type: Number,
      default: 0,
    },
    sinr: {
      type: Number,
      default: 0,
    },
    pci:{
      type: Number,
      default: 0,
    },
    cellId:{
      type: Number,
      default: 0,
    },
    longitude:{
      type: Number,
      default: 0,
    },
    latitude:{
      type: Number,
      default: 0,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    modifiedDate: {
      type: Date,
      default: Date.now(),
    }
  }
);

const Data = mongoose.model("Data", dataSchema);

const deviceSchema = new mongoose.Schema(
  {
    // _id:{
    //   type:String,
    // },
    deviceName:{
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    data: [{ type: Schema.Types.ObjectId, ref: 'Data' }],
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    modifiedDate: {
      type: Date,
      default: Date.now(),
    }
  }
);
deviceSchema.set('toObject', { getters: true });
deviceSchema.set('toJSON', { getters: true });
const Device = mongoose.model("Device", deviceSchema);

module.exports ={Data,Device};
