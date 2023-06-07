const moment = require('moment-timezone');
require("dotenv").config(require("../config/dotenv"));

module.exports = moment.tz(Date.now(), process.env.TZ);