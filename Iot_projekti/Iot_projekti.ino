#include <ArduinoJson.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_BME280.h>
#include <Wire.h>
#include <ESP8266WiFi.h> 



#define IP "http://192.168.8.138:3001/api/reading"




//https://github.com/DigitKoodit/iot-workshop/tree/master/embedded

//https://github.com/Kimsi1/IoT-Lab4/tree/master/lab4



// Initialize sensor
Adafruit_BME280 sensor;


ESP8266WiFiMulti WiFiMulti;

const char* ssid = "mokkula_257561"; const char* password = "1153618708"; 






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
 
    
}

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
  

  
  
  String json = "{\"sensor\":\"sensor\",\"gx\":\"" + String(gx) + "\",\"gy\":\"" + String(gy) + "\",\"gz\":\"" + String(gz)+ "\"}";

  HTTPClient http;

    Serial.println("[HTTP] begin...");

    http.begin(IP);
    http.addHeader("Content-Type", "application/json");

    int httpcode = http.POST(json);

    if (httpcode == HTTP_CODE_OK)
    {
      Serial.println("Transmission OK");
    }else{
      Serial.println("Transmission failure!");
      Serial.println(httpcode);
    }

  http.end();

delay(600000);
  

  



}
