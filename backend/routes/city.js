const axios = require('axios');
const { response } = require('express');
const mongoose = require('mongoose');
const cityInfo = mongoose.model('cityInfo')
const express=require("express")
const router =express.Router()


router.get('/addCity',async (req,res)=>{
  


let response

try{
    response=await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName},,IN&limit=2&appid=${process.env.API_KEY}`)
   
    console.log(response.data[0].lat)
   
   
}catch(err){

    return res.send(err)
}

const newCity = new cityInfo({
    
    cityName: req.body.cityName,
    cityLat:response.data[0].lat,
    cityLng:response.data[0].lon

    
})
try{
    console.log(newCity)
    await newCity.save();
}catch(err){
    console.log(err)
    const error = new Error("Error Registering City")
    error.code = 500;
   return res.status(error.code).json(error.message)
}

//var val=response.data.data.aqi

return res.send(response.data[0])
   
})



module.exports=router