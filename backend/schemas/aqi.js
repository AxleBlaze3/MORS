const mongoose=require('mongoose')

const curAqiSchema=new mongoose.Schema({
    place:String,
    lat:String,
    long:String,
    datetime:String,
    aqi:String
})

mongoose.model("aqi",curAqiSchema)