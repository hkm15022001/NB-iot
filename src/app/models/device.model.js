const mongoose = require("mongoose");
const { Schema } = mongoose;
const dataSchema = new mongoose.Schema(
  {
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
      default: Date.now,
    },
    modifiedDate: {
      type: Date,
      default: Date.now,
    }
  }
);
const Data = mongoose.model("Data", dataSchema);

const deviceSchema = new mongoose.Schema(
  {
    deviceName:{
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    data: [{ type: Schema.Types.ObjectId, ref: 'Data' }]
  },
  { timestamps: true }
);
const Device = mongoose.model("Device", deviceSchema);

module.exports ={Data,Device};
