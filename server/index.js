const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reading = require('./models/reading.js')

const hue = require("node-hue-api"), HueApi = hue.HueApi, lightState = hue.lightState;


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())


const displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
};
const displayError = function(err) {
  console.log(err);
};

const host = "192.168.8.109"
const user = "FCxPbfSJ6dYW1HpKmYKDkMWl1Bg9NwHM0su0TRVO"


const api = new HueApi(host, user);

const state = lightState.create();





const formatReading = (reading) => {
  return {
    
        sensor: reading.sensor,    
        gx: reading.gx,
        gy: reading.gy,
        gz: reading.gz
      
  }
}



// this page should never be displayed
app.get('/', (req, res) => {
  res.send('<h1>Nothing to see here.</h1>')
})




// Set the lamp with id '4' to on as either color red or white, depending on temperature
app.get('/api/lightson', (req, res) => {
  

  Reading
  .find({})
  .then(reading => {
    if (parseInt(reading.map(data => data.gx)) > 35 ){
      api.setLightState(4, state.on().rgb(255,0,0), function(err, result) {
        if (err) throw err;
        displayResult(result);
        
      });
    }
    if (parseInt(reading.map(data => data.gx)) < 36 ){
      api.setLightState(4, state.on().rgb(255,250,250), function(err, result) {
        if (err) throw err;
        displayResult(result);
        
      });
    }

    res.status(204).end()
  })
  .catch(error => {
    console.log(error)
    response.status(404).send({ error: '404' })
  })
})




// Turn off the lamp id '4'
app.get('/api/lightsoff', (req, res) => {

  api.setLightState(4, state.off(), function(err, result) {
    if (err) throw err;
    displayResult(result);
    res.status(204).end()
  });


})



// return sensor data from cloud database
app.get('/api/reading', (req, res) => {
  
  // if temperature is over 35, turn light on with red color
  Reading
  .find({})
  .then(reading => {
    if (parseInt(reading.map(data => data.gx)) > 35 ){
      api.setLightState(4, state.on().rgb(255,0,0), function(err, result) {
        if (err) throw err;
        displayResult(result);
        
      });
    }

    res.json(reading.map(formatReading))
  })
  .catch(error => {
    console.log(error)
    response.status(404).send({ error: '404' })
  })
})




// save data from sensor to cloud database
app.post('/api/reading', (request, response) => {
  const body = request.body

  
  const reading = {
      sensor: body.sensor,
      gx: body.gx,
      gy: body.gy,
      gz: body.gz
  }

  Reading
    .findOneAndUpdate({sensor: 'sensor'}, reading, {new: true})
    .then(savedReading => {
      response.json(formatReading(savedReading))
  
  })

})






const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    const host = server.address().address;
  console.log(`Server running on port ${PORT} and address: `+host)
})

