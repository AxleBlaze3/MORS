const axios = require('axios');
const { response } = require('express');
const express=require("express");
const { ResultWithContext } = require('express-validator/src/chain');
const mongoose=require("mongoose")
const router =express.Router()
const cityInfo = mongoose.model('cityInfo')
const aqiInfo=mongoose.model('aqiInfo')
const pollCollection=mongoose.model('pollCollection')

function getCategory(aqi){
   
    
    if(aqi >= 300 ){
        return {aqi:"5",
        category:"Hazardous",
        healthEffects:"Health alert: everyone may experience more serious health effects",
        guidanceStatement:"Everyone should avoid all outdoor exertion"
        }
    }
    else if(aqi >= 200 && aqi < 300){
        return {aqi:"4",
        category:"Very Unhealthy",
        healthEffects:"Health warnings of emergency conditions. The entire population is more likely to be affected.",
        guidanceStatement:"Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."

        }
    }
    else if(aqi >= 150 && aqi < 200){
        return {aqi:"3",
        category:"Unhealthy",
        healthEffects:"Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
        guidanceStatement:"Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
        } 

    }
    
    else if(aqi >= 100 && aqi < 150){
        return {aqi:"2",
        category:"Unhealthy for Sensitive Groups",
        healthEffects:"Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        guidanceStatement:"Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
        }
    }
    else if(aqi >= 51 && aqi < 100){
        return {aqi:"1",
        category:"Moderate",
        healthEffects:"Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        guidanceStatement:"Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
        }
    }
   
    else{
       
        return {aqi:"0",
        category:"Good",
        healthEffects:"Air quality is considered satisfactory, and air pollution poses little or no risk",
        guidanceStatement:"None"
        }
    }
    
}
async function  getResp(cityName){

    
    try{
        //console.log(cityName)
        let response=await axios.get(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${process.env.G_API_KEY}&format=json&offset=0&limit=10&filters[city]=${cityName}`)
        //console.log(response)
        return response
        
       
       
    }catch(err){
        console.log("hi")
        console.log(err)
        return err
    }
    
}
router.get('/push',async (req,res)=>{
    let cities
    let cityId
    let cityLat
    let cityLng
    let PM25=[]
    let NO2=[]
    let SO2=[]
    let PM10=[]
    let NH3=[]
    let CO=[]

    try{
        cities=await cityInfo.find({})
    }catch(err){
        res.send(err)
    }
    randArr=[]
    console.log(cities.length)
    for(var o=0;o<cities.length;o++){
         PM25=[]
        NO2=[]
        SO2=[]
        PM10=[]
        NH3=[]
        CO=[]
        
        cityName=cities[o].cityName
        cityId=cities[o]._id
        cityLat=cities[o].cityLat
        cityLng=cities[o].cityLng
        //console.log(cityName)
        console.log(o)
        let response=await getResp(cityName)
       //console.log(response.data)
    
    
    var pollutantList=[];
    pollutants=["PM2.5","PM10","NO2","NH3","SO2","CO"]
    
        for (var j=0;j<pollutants.length;j++){
            
            for(var i = 0; i < response.data.records.length; i++){
        
      if(response.data.records[i].pollutant_id == pollutants[j]){
         
          pollutantList.push(response.data.records[i])
        break;
      }
      if(i==response.data.records.length-1){
        pollutantList.push({pollutant_id:pollutants[j],pollutant_avg:"NA",pollutant_min:"NA",pollutant_max:"NA"})
      }
    }
        }
       //console.log(pollutantList)
        
        if(pollutantList[0].pollutant_avg=='NA'||pollutantList[1].pollutant_avg=='NA'){
           
            if(pollutantList[0].pollutant_avg=='NA' && pollutantList[1].pollutant_avg=='NA' ){
                for (var k=0;k<pollutantList.length;k++){
                    if(pollutantList[k].pollutant_id!="NH3"||pollutantList[k].pollutant_avg!='NA'){
                        result.aqi="NA",
                        result.category="NA",
                        result.healthEffects="NA",
                        result.guidanceStatement="NA"
                        result.aqiVal=pollutantList[k].pollutant_avg
                        result.pollutant_id=pollutantList[k].pollutant_id
                        result.city=pollutantList[k].city
                        result.datetime=pollutantList[k].last_update
                    }
                }
    
            }else if(pollutantList[0].pollutant_avg=='NA'){
                result=getCategory(pollutantList[1].pollutant_avg)
                
                
                result.aqiVal=pollutantList[1].pollutant_avg
                result.pollutant_id=pollutantList[1].pollutant_id
                result.city=pollutantList[1].city
                result.datetime=pollutantList[1].last_update
    
            }else if(pollutantList[1].pollutant_avg=='NA'){
               
                result=getCategory(pollutantList[0].pollutant_avg)
                
                result.aqiVal=pollutantList[0].pollutant_avg
                result.pollutant_id=pollutantList[0].pollutant_id
                result.city=pollutantList[0].city
                result.datetime=pollutantList[0].last_update
              //  console.log(pollutantList[0].pollutant_avg)
    
            }
        }else if(pollutantList[0].pollutant_avg<pollutantList[1].pollutant_avg){
            
            result=getCategory(pollutantList[1].pollutant_avg)
            
            result.aqiVal=pollutantList[1].pollutant_avg
            result.pollutant_id=pollutantList[1].pollutant_id
            result.city=pollutantList[1].city
            result.datetime=pollutantList[1].last_update
    
        
        }else if(pollutantList[1].pollutant_avg<=pollutantList[0].pollutant_avg ){
            //console.log(pollutantList[0].pollutant_avg)
            result=getCategory(pollutantList[0].pollutant_avg)
            result.aqiVal=pollutantList[0].pollutant_avg
            result.pollutant_id=pollutantList[0].pollutant_id
            result.city=pollutantList[0].city
            result.datetime=pollutantList[0].last_update
           // console.log(pollutantList[0].pollutant_avg)
    
         }

         for(var z=0;z<pollutantList.length;z++){
             if(z==0){
                 PM25.push(pollutantList[z].pollutant_id)
                 PM25.push(pollutantList[z].pollutant_min)
                 PM25.push(pollutantList[z].pollutant_avg)
                 PM25.push(pollutantList[z].pollutant_max)


             }else if(z==1){
                PM10.push(pollutantList[z].pollutant_id)
                PM10.push(pollutantList[z].pollutant_min)
                PM10.push(pollutantList[z].pollutant_avg)
                PM10.push(pollutantList[z].pollutant_max)

             }else if(z==2){
                NO2.push(pollutantList[z].pollutant_id)
                NO2.push(pollutantList[z].pollutant_min)
                NO2.push(pollutantList[z].pollutant_avg)
                NO2.push(pollutantList[z].pollutant_max)

             }else if(z==3){
                NH3.push(pollutantList[z].pollutant_id)
                NH3.push(pollutantList[z].pollutant_min)
                NH3.push(pollutantList[z].pollutant_avg)
                NH3.push(pollutantList[z].pollutant_max)

             }else if(z==4){
                SO2.push(pollutantList[z].pollutant_id)
                SO2.push(pollutantList[z].pollutant_min)
                SO2.push(pollutantList[z].pollutant_avg)
                SO2.push(pollutantList[z].pollutant_max)

             }else if(z==5){
                CO.push(pollutantList[z].pollutant_id)
                CO.push(pollutantList[z].pollutant_min)
                CO.push(pollutantList[z].pollutant_avg)
                CO.push(pollutantList[z].pollutant_max)

             }
         }
         console.log(PM25)

         const newPCol=new pollCollection({
             cityId:cityId,
             cityName:cityName,
             PM25:PM25,
             PM10:PM10,
             SO2:SO2,
             NO2:NO2,
             NH3:NH3,
             CO:CO
         })
         try{
            console.log(newPCol)
            await newPCol.save();
        }catch(err){
            console.log(err)
            const error = new Error("Error Registering Pollutants")
            error.code = 500;
           return res.status(error.code).json(error.message)
        }



    /*
    //saving aqi
        const newAqi= new aqiInfo({
            cityId:cityId,
            aqi:result.aqi,
            healthEffects:result.healthEffects,
            guidanceStatement:result.guidanceStatement,
            aqiVal:result.aqiVal,
            pollutant_id:result.pollutant_id,
            category:result.category,
            cityLat:cityLat,
            cityLng:cityLng,
            cityName:cityName

        })
        try{
            console.log(newAqi)
            await newAqi.save();
        }catch(err){
            console.log(err)
            const error = new Error("Error Registering Aqi")
            error.code = 500;
           return res.status(error.code).json(error.message)
        }
         //saving aqi
*/

       
        
        //console.log(result)
        
       
      }


    res.json(randArr)
})

module.exports=router

