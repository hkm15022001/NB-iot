const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment-timezone');

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
      default: () => moment().add(7, 'hours')
    },
    modifiedDate: {
      type: Date,
      default: () => moment().add(7, 'hours')
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
      default: () => moment().add(7, 'hours')
    },
    modifiedDate: {
      type: Date,
      default: () => moment().add(7, 'hours')
    }
  }
);

const Device = mongoose.model("Device", deviceSchema);

module.exports ={Data,Device};
