const axios = require('axios');
const express=require("express")
const router =express.Router()


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

function getMaxAqi(aqis){
    let max=0
    for (var i=0;i<aqis.length;i++){
        
        if(aqis[max].aqi<aqis[i].aqi){
            max=i
        }


    }
    return max
}
router.post('/curr',async (req,res)=>{
   
    let response
    let result
 
     try{
        response=await axios.get(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${process.env.G_API_KEY}&format=json&offset=0&limit=10&filters[city]=${req.body.city}`)
        
        
       
       
    }catch(err){
    
        return res.send(err)
    }


var pollutantList=[];
pollutants=["PM2.5","PM10","NO2","NH3","SO2","CO"]

    for (var j=0;j<pollutants.length;j++){
        
        for(var i = 0; i < response.data.records.length; i++)
{
    
  if(response.data.records[i].pollutant_id == pollutants[j])
  {
     
      pollutantList.push(response.data.records[i])
    break;
  }
  if(i==response.data.records.length-1){
    pollutantList.push({pollutant_id:pollutants[j],pollutant_avg:"NA"})
  }
}
    }
   console.log(pollutantList)
    
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

    
    }else if(pollutantList[1].pollutant_avg<pollutantList[0].pollutant_avg ){
        //console.log(pollutantList[0].pollutant_avg)
        result=getCategory(pollutantList[0].pollutant_avg)
        result.aqiVal=pollutantList[0].pollutant_avg
        result.pollutant_id=pollutantList[0].pollutant_id
        result.city=pollutantList[0].city
        result.datetime=pollutantList[0].last_update
       // console.log(pollutantList[0].pollutant_avg)

     }

    

    return res.json(result)
})



module.exports=router



