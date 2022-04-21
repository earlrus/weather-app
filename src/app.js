const path=require('path')
const express=require('express');
const hbs=require('hbs');
const { hasSubscribers } = require('diagnostics_channel');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const { setTimeout } = require('timers/promises');


const app=express();


//define paths for express configuration

const publicDirectory=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));


app.get("",(req,res)=>{

    res.render('index',{
        title:"Weather",
        name:"Aman"
    })
})


app.get("/about",(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aman'
    })
})

app.get("/help",(req,res)=>{
  res.render('help',{
      title:'Help',
      message:'This is some helpful text',
      name:'Aman'
  })
})


app.get("/weather",(req,res)=>{
if(!req.query.address){
    return res.send({
        error:"You must provide an address"
    })
}



geocode(req.query.address,(error,data)=>{
    
const location=data.location


  const  latitude=data.latitude
const longitude=data.longitude

forecast(latitude,longitude,(error,forecastData)=>{

    const forecast=forecastData

    res.send({
        forecast:forecast,
        location:location,
        address:req.query.address
    })
})



})



  

})

app.get('/help/*',(req,res)=>{
   
    res.render('404',{
        name:"Aman",
        title:"Page not Found"
    })
})

app.get("*",(req,res)=>{
    res.render('404',{
        name:"Aman",
        title:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log("App is running on port 3000");
})

