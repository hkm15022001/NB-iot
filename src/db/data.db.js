const { date } = require("joi");
const { Device, Data } = require("../app/models/device.model");
const moment = require("moment");

// Get one device data
const getDeviceDataDb = async (query) => {
    try {
        const device = await Device.findById(query)
            .populate({
                path: "data",
                options: { sort: { createdDate: -1 }, limit: 10 }, // Sắp xếp và giới hạn kết quả
            });
        return {
            data: device?.data
        }
        // const device = await Device.findOne(query).sort({
        //     _id: -1, // mới nhất đến cũ nhất
        // });
        // // console.log(Devices);
        // return {
        //     device,
        // };
    } catch (error) {
        console.log(error);
        return "error when get data";
    }
};

// get data from device
const getDeviceDataRangeDb = async (query) => {
    const { deviceId, dateBegin, dateEnd, miniRange } = query;
    //lấy thông tin theo các mốc thời gian
    try {
        const rs = await Data.find({
            deviceId: deviceId,
            createdDate: {
                $gte: dateBegin.toDate(),
                $lte: dateEnd.toDate()
            },
        }).sort({ field: "asc", _id: -1 });
        //console.log(rs);
        //Biến lưu danh sách kết quả trung bình, kết quả trung bình chia làm 20 khoảng
        var result = [];
        for (let i = dateBegin.valueOf(); i < dateEnd.valueOf(); i += miniRange) {
            let value = {
                rsrp: 0,
                rsrq: 0,
                sinr: 0,
                pci: 0,
                cellId: 0,
                longitude: 0,
                latitude: 0,
            };
            //biến lưu số bản ghi trong một khoảng thời gian
            let count = 0;
            let arr = rs.filter((obj) => {
                return (
                    moment(obj.createdDate).valueOf() > i &&
                    moment(obj.createdDate).valueOf() < i + miniRange
                );
            });
            
            if (Array.isArray(arr) && arr.length) {
                arr.forEach((item, index) => {
                    if (item && item !== "null" && item !== "undefined") {
                        for(let key in value){
                            if (value.hasOwnProperty(key)) {
                                value[key]+=item[key];
                              }
                        }
                        count++;
                    }
                });
            }
            //nếu trong khoảnh thời gian không có bản ghi nào thì count = 0 => 0/0 = null;
            if (count != 0) {
                for(let key in value){
                    if (value.hasOwnProperty(key)) {
                        value[key]/=count;
                      }
                }
            }
            
            result.push(value);
        }
        return result;
    } catch (error) {
        console.log("error when find device from getDeviceDataRangeDb ", error);
    }

    // const rs = await Device.find({
    // Sắp xếp và giới hạn kết quả
    //     _id: deviceId,
    //     createdDate: {
    //         $gte: dateBegin.get("time"),
    //         $lte: dateEnd.get("time"),
    //     },
    // }).sort({ field: "asc", _id: -1 });
};

// Insert data
const insertDataDeviceDb = async (query) => {
    const { deviceId, rsrp, pci, rsrq, sinr, cellId, longitude, latitude } = query;

    try {
        // Tạo một đối tượng Data mới
        const newData = await new Data({ deviceId, rsrp, rsrq, pci, sinr, cellId, longitude, latitude }).save();

        // Tìm và liên kết đối tượng Data với một đối tượng Device cụ thể
        const device = await Device.findById(deviceId);
        if (!device) {
            console.log("Người dùng đã chọn sai deviceID để publish");
            return;
        }

        // Liên kết đối tượng Data với đối tượng Device
        device.data.push(newData);
        // Lưu đối tượng Device để cập nhật quan hệ
        const rs = await device.save((err) => {
            if (err) {
                console.log("Error when insert data from mqtt: ", err)
                return;
            }
            console.log("Đã thêm một bản ghi dữ liệu");
        });
    } catch (error) {
        console.log("Error when find device in insert data from mqtt: ", error)
    }
};

module.exports = {
    getDeviceDataDb,
    getDeviceDataRangeDb,
    insertDataDeviceDb,
};
