const { date } = require("joi");
const { Device, Data } = require("../app/models/device.model");

// Get one device data
const getDeviceDataDb = async (query) => {
    try {
        const device = await Device.findById(query)
            .populate({
                path: "data",
                options: { sort: { createdAt:-1 }, limit: 1 }, // Sắp xếp và giới hạn kết quả
            });
        return {
            data : device.data[0]
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
    const { device, dateBegin, dateEnd, miniRange } = query;
    const deviceId = device._id;
    //lấy thông tin theo các mốc thời gian
    const rs = await Device.find({
        _id: deviceId,
        createdDate: {
            $gte: dateBegin.get("time"),
            $lte: dateEnd.get("time"),
        },
    }).sort({ field: "asc", _id: -1 });

    //Biến lưu danh sách kết quả trung bình, kết quả trung bình chia làm 20 khoảng
    var result = [];
    for (let i = start; i < end; i += miniRange) {
        let value = {
            // rsrpLand: 0,
            rsrp: 0,
            rsrq: 0,
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
                    // value.humidityLand += item.humidityLand;
                    value.rsrp += item.rsrp;
                    value.rsrq += item.rsrq;
                    count++;
                }
            });
        }
        //nếu trong khoảnh thời gian không có bản ghi nào thì count = 0 => 0/0 = null;
        if (count != 0) {
            // value.humidityLand = value.humidityLand / count;
            value.rsrp = value.rsrp / count;
            value.rsrq = value.rsrq / count;
        }
        result.push(value);
    }
    return result;
};

// Insert data
const insertDataDeviceDb = async (query) => {
    const { deviceId, rsrp, rsrq, sinr, cellId, longitude, latitude } = query;
   
    try {
        // Tạo một đối tượng Data mới
        const newData = await new Data({ rsrp, rsrq, sinr, cellId, longitude, latitude }).save();
        
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
        console.log("Error when find device in insert data from mqtt: ", err)
    }
};

module.exports = {
    getDeviceDataDb,
    getDeviceDataRangeDb,
    insertDataDeviceDb,
};
