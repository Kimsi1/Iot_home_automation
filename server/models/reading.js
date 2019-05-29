const mongoose = require('mongoose')


if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }

  
const url = 'mongodb+srv://fullstack:XXX@exmplcluster-c4xch.mongodb.net/iot_home_automation'

mongoose.connect(url)





const readingSchema = new mongoose.Schema({
  sensor: String,    
  gx: String,
  gy: String,
  gz: String
  })

  
const Reading = mongoose.model('sensor_datas', readingSchema);
  


module.exports = Reading



