require('dotenv').config();
require('./models/cityInfo');
const mongoose = require('mongoose');
const express=require('express')

//const mongose=require('mongoose')
const currAqi=require('./routes/currAqi')
const historicalAqi=require('./routes/historicalAqi')
const app=express()
const cityRoute = require('./routes/city')
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(currAqi)
app.use(historicalAqi)
app.use(cityRoute)

app.get('/',(req,res)=>{
  return res.send("Hello")
})


const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected.');
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.listen(port, () => console.log(`Server Started on Port ${port}...`));
console.log('Please Wait.... Mongoose is Connecting...');
