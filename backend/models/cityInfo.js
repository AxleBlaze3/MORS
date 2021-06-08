const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: {type: String, required: true},
  cityLat:{ type: String, required: true},
  cityLng:{ type: String, required: true}
  
  //profilePic
});

mongoose.model('cityInfo', citySchema);
