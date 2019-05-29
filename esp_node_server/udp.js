var PORT = 4210;

var HOST = '192.168.8.126';

 

var dgram = require('dgram');

var message = new Buffer('New message');
var viesti = '';
 

var client = dgram.createSocket('udp4');

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {

    if (err) throw err;

    console.log('UDP client message sent to ' + HOST +':'+ PORT);

   

});

client.on('message', function (message1, remote) {

    console.log(remote.address + ':' + remote.port +' - ' + message1);
    viesti = message1.toString();
    json=JSON.parse(viesti);
    

    client.close();

 

});



const mongo = require('mongodb').MongoClient

// Do not store the password on GitHub!
const url = 'mongodb+srv://fullstack:ÖÖÖÖ@exmplcluster-c4xch.mongodb.net/iotlab4'




  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    
  
    
  const db = client.db('iot_home_automation')
  const collection = db.collection('iot_home_automation')

  collection.insertOne(json, (err, result) => {

  })

  client.close()


})
