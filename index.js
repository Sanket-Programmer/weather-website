import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
 //Weatherapi#sanket
//api_key = "78fce9cbe647cbd14f00c133a710d9c1";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/" , async(req,res) => {
    try{
    const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=Bhubaneshwar&appid=78fce9cbe647cbd14f00c133a710d9c1`);
    const location_data = result.data;
    const lat = location_data[0].lat;
    const lon = location_data[0].lon;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78fce9cbe647cbd14f00c133a710d9c1&units=metric`);
    const weather_data = response.data;
    res.render("index.ejs" , {weather_data: weather_data , location_data: location_data[0]});
    } catch (error){
      if(error.cod == "400"){
        res.send({message:error.message, code: error.cod});
     }
     else if(error.cod == "401"){
       res.send({message:error.message, code: error.cod});
     }
     else if(error.cod == "404"){
       res.send({message:error.message, code: error.cod});
     }
 
     else if (error.cod == "429"){
       res.send({message:error.message, code: error.cod});
     }
 
     else if(error.cod == "5xx"){
       res.send({message:error.message, code: error.cod});
     } 
    }
});

app.post("/search", async (req,res) => {
  try{
    const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.search}&appid=78fce9cbe647cbd14f00c133a710d9c1`);
    const location_data = result.data;
    const lat = location_data[0].lat;
    const lon = location_data[0].lon;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78fce9cbe647cbd14f00c133a710d9c1&units=metric`);
    const weather_data = response.data;
    res.render("index.ejs" , {weather_data: weather_data , location_data: location_data[0]});
  } catch (error){
    if(error.cod == "400"){
       res.send({message:error.message, code: error.cod});
    }
    else if(error.cod == "401"){
      res.send({message:error.message, code: error.cod});
    }
    else if(error.cod == "404"){
      res.send({message:error.message, code: error.cod});
    }

    else if (error.cod == "429"){
      res.send({message:error.message, code: error.cod});
    }

    else if(error.cod == "5xx"){
      res.send({message:error.message, code: error.cod});
    } 
  }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
