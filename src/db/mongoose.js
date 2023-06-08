const mongoose = require('mongoose');
require("dotenv").config();
var dbState = [{
  value: 0,
  label: "disconnected"
},
{
  value: 1,
  label: "connected"
},
{
  value: 2,
  label: "connecting"
},
{
  value: 3,
  label: "disconnecting"
}];
const options = {
  dbName : process.env.DB_NAME,
  user: process.env.DB_USER_NAME,
  pass: process.env.DB_PASSWORD

};
const connection =async ()=>{
    //console.log(options.user, options.pass);
    await mongoose.connect(process.env.DB_URL , options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to db"); 
} 

module.exports = {connection}