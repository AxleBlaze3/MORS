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
        data:[124,336,175,115,170,154,107,107,107,107]
    
        
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