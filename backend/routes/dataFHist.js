const axios = require('axios');
const { response } = require('express');
const mongoose = require('mongoose');
const cityInfo = mongoose.model('cityInfo')
const histData=mongoose.model('histData')
const express=require("express")
const router =express.Router()


router.post('/add-data',async (req,res)=>{
    let response
    try{
        city = await cityInfo.find({cityName:req.body.cityName})
        //return res.json(city[0]._id)
    }catch(err){
        const error = new Error("Unknown error")
        error.code = 422;
       return res.status(error.code).json(error.message)
    }

    const newHistData = new histData({
    
        cityId: city[0]._id,
        data:[115,89,121,159,129,110,120,333,694,188]
    
        
    })
    try{
        console.log(newHistData)
        await newHistData.save();
    }catch(err){
        console.log(err)
        const error = new Error("Error Storing Data")
        error.code = 500;
       return res.status(error.code).json(error.message)
    }

    return res.json(city)
    


})



module.exports=router