const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Reading = require('./models/reading.js')



app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())






app.post('/api/reading', (request, response) => {
    const body = request.body
  
    
    const reading = new Reading ({
        sensor: body.sensor,
        gx: body.gx,
        gy: body.gy,
        gz: body.gz,
       
        id: (Math.round(Math.random() * (100000)))
    })
  
    reading
      .save()
      .then(savedReading => {
        response.json(formatNote(savedReading))
    
    })
 
  })
  





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

