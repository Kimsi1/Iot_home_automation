#include <ArduinoJson.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_BME280.h>
#include <Wire.h>
#include <ESP8266WiFi.h> 
#include <WiFiUdp.h> 



//https://github.com/DigitKoodit/iot-workshop/tree/master/embedded

//https://github.com/Kimsi1/IoT-Lab4/tree/master/lab4



// Initialize sensor
Adafruit_BME280 sensor;


ESP8266WiFiMulti WiFiMulti;

  const char* ssid = "OnePlus 5T"; const char* password = "12345678"; 

  WiFiUDP Udp; 
  unsigned int localUdpPort = 4210;  // local port to listen on 
  char incomingPacket[255];  // buffer for incoming packets 
  char replyPacket[]="";






void setup() {
  // put your setup code here, to run once:




  Serial.begin(115200);

  Wire.begin();
  if(!sensor.begin(0x76)) {
    Serial.println("Error: Sensor not found!");
  }



 
  Serial.printf("Connecting to %s ", ssid);   
  WiFi.begin(ssid, password); 


  
  while (WiFi.status() != WL_CONNECTED) 
  {     
    delay(1500); 
    Serial.print("."); 
  } 
  Serial.println(" connected"); 
 
  Udp.begin(localUdpPort); 
  Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUdpPort); } 

  
    
 
void loop() 
{ 

  int gx, gy, gz;         // raw gyro values
  
  // read raw gyro measurements from device
  

  
  gx = sensor.readTemperature();
  gy = sensor.readPressure();
  gz = sensor.readHumidity();
    
 
  // display tab-separated gyro x/y/z values
  Serial.print("g:\t");
  Serial.print(gx);
  Serial.print("\t");
  Serial.print(gy);
  Serial.print("\t");
  Serial.print(gz);
  Serial.println();
  Serial.println(Udp.remoteIP());
  Serial.println();

  
  delay(1000);

  
  int packetSize = Udp.parsePacket();   
  if (packetSize) 
  { 
    // receive incoming UDP packets 
    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort()); 
    int len = Udp.read(incomingPacket, 255);     
    if (len > 0) 
    { 
      incomingPacket[len] = 0; 
    } 
    Serial.printf("UDP packet contents: %s\n", incomingPacket); 
 
    // send back a reply, to the IP address and port we got the packet from 
    Udp.beginPacket(Udp.remoteIP(), Udp.remotePort()); 
    String json = "{\"sensor\":\"bmi160\",\"gx\":\"" + String(gx) + "\",\"gy\":\"" + String(gy) + "\",\"gz\":\"" + String(gz)+ "\"}";
    json.toCharArray(replyPacket, 255);
    Udp.write(replyPacket); 
    Udp.endPacket(); 
  } 
  




}
