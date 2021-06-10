const mongoose = require('mongoose');

const pollutantSchema = new mongoose.Schema({
  cityId: {type: mongoose.Schema.Types.ObjectId, ref:'cityInfo',required:true},
  cityName:{type:String,required:true},
  PM25:{ type: Array, required: true},
  SO2:{ type: Array, required: true},
  PM10:{ type: Array, required: true},
  NO2:{ type: Array, required: true},
  NH3:{ type: Array, required: true},
  CO:{ type: Array, required: true}

  
  //profilePic
});

mongoose.model('pollCollection', pollutantSchema);
