const mongoose = require('mongoose');

const histSchema = new mongoose.Schema({
  cityId: {type: mongoose.Schema.Types.ObjectId, ref:'cityInfo',required:true},
  data:{ type: Array, required: true}
  
  //profilePic
});

mongoose.model('histData', histSchema);
