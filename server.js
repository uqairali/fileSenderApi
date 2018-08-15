//importing modules
var express=require('express');
var bodyparser=require('body-parser');
var path=require('path');
var cors=require('cors');
const http=require('http');


var app=express();

const route=require('./api/routes/notes');
const jwt=require('./api/routes/jwt');


//port no
const port = process.env.PORT || 8080;

//adding middleware core
app.use(cors());

//body parser
app.use(bodyparser.json());

//meddleware
app.use(function(req,res,next){
    console.log(req.url);
    next();
 })
//routes
app.use('/notes',route);
app.use('/jwt',jwt);


//testing server
app.get('/',(req,res)=>{
    res.send('foobar');
});


//this exple is use to url encoded mean long urls convert to shart 
var urls = {'2K0mifV':'https://www.google.com.pk/imgres?imgurl=https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/PrimeMinisterNawazSharif.jpg/220px-PrimeMinisterNawazSharif.jpg&imgrefurl=https://en.wikipedia.org/wiki/Nawaz_Sharif&h=278&w=220&tbnid=qvM_mSK4RT_z7M:&q=nawaz+sharif&tbnh=160&tbnw=126&usg=__8JdmK8fwTo1WzFZfHwGqgZGKS1Q%3D&vet=1&docid=R0w0ZgxnmPLmvM&itg=1&sa=X&ved=2ahUKEwijv_XW177cAhVCQhoKHYIeDCQQ_B0wJHoECA0QFA'}
app.get('/bitly/:code',(req,res)=>{
    console.log(req.params.code);
    res.redirect(301,urls[req.params.code]);
});


const server=http.Server(app);
  

  server.listen(port,function(){
      console.log("server is running on port "+ port);
  });
