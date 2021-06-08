const axios = require('axios');
const { response } = require('express');
const express=require("express")
const router =express.Router()

function dateToUnix(date){

    return parseInt((new Date(date).getTime() / 1000).toFixed(0))

}
function sub10Days(date){
    var d=new Date(date)

    
    d.setDate(d.getDate()-10)
    return (d.getTime()/1000).toFixed(0)

}
router.get('/hist',async (req,res)=>{
  /* 
  var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '.' + mm + '.' + dd;
    
    try{
        axios.get('http://api.openweathermap.org/data/2.5/air_pollution/history?', {
            params: {
              lat:req.body.lat ,
              lon:req.body.lon,
              start:sub10Days(today),
              end:dateToUnix(today),
              appid:process.env.API_KEY
            }
          })
          .then(function (response) {
           
            return res.json(response.data)
          
          })
        
        
       
       
    }catch(err){
    
        return res.send(err)
    }
    */


let response

try{
    response=await axios.get(`https://api.waqi.info/feed/${req.body.city}/?token=030faa7231e6f44ce81b0fa02fcaccce210f634e`)
   
    
   
   
}catch(err){

    return res.send(err)
}
var val=response.data.data.aqi

return res.send(response.data)
   
})



module.exports=router