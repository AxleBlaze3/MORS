const mongoose = require('mongoose');

const aqiInfoSchema = new mongoose.Schema({
  cityId: {type: mongoose.Schema.Types.ObjectId, ref:'cityInfo',required:true},
  aqi:{type: String,required:true,max:1},
  healthEffects:{type:String,required:true},
  guidanceStatement:{type:String,required:true},
  aqiVal:{type: String,required:true},
  pollutant_id:{type:String,required:true},
  category:{type:String,required:true},
  cityName:{type:String,required:true},
  cityLat:{ type: String, required: true},
  cityLng:{ type: String, required: true}

  
  //profilePic
});

mongoose.model('aqiInfo', aqiInfoSchema);
