const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reading = require('./models/reading.js')



app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())




const formatReading = (reading) => {
    return {
      
          sensor: reading.sensor,    
          gx: reading.gx,
          gy: reading.gy,
          gz: reading.gz
        
    }
  }
  
  




app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
 


  app.get('/api/reading', (req, res) => {
    
    Reading
    .find({})
    .then(reading => {
      res.json(reading.map(formatReading))
    })
    .catch(error => {
      console.log(error)
      response.status(404).send({ error: '404' })
    })
})



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

