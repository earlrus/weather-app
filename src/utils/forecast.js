 const request = require('request');

 const forecast=(latitude,longitude,callback)=>{

    const url=`http://api.weatherstack.com/current?access_key=c4e5fa42a1888db02f51c12f667adb56&query=${latitude},${longitude}`
 
request({url:url,json:true},(error,response)=>{

if(error){
    callback('Unable to connect to the weather services',undefined)
}
else if(response.body.error){

    callback('Unable to find the weather.Try another search',undefined)
}

else{

    callback(undefined,`${response.body.current.weather_descriptions[0]} .It is currently ${response.body.current.temperature} degrees out.It feels like ${response.body.current.feelslike} degrees out there`)
}

})

}


module.exports=forecast;