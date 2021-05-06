const axios = require('axios');
const express=require("express")
const router =express.Router()


router.get('/curr',async (req,res)=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '.' + mm + '.' + dd;
    let response
    try{
        response=await axios.get('http://api.openweathermap.org/data/2.5/air_pollution?', {
            params: {
              lat:req.body.lat ,
              lon:req.body.lon,
              appid:process.env.API_KEY
            }
          })
       
        
       
       
    }catch(err){
    
        return res.send(err)
    }
    return res.json(response.data)
    
})



module.exports=router