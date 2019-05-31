# Iot_home_automation

This is a project to create a home automation system with temperature and humidity sensor and a light control.

Hardware used:

    -Raspberry Pi

    -ESP8266 + sensor

    -Philips Hue light + bridge


Raspberry Pi works as a central hub in this system. A Node.js server is running on the Pi providing REST API, and also a web interface is hosted by the Pi.

The ESP8266 with a sensor attached feeds data to the Pi in a JSON format as a HTTP POST request.
The sensor data is saved to a Mongo database operating in a cloud.

Philips Hue light is controlled through Hue bridge with API calls.


![My image](https://raw.githubusercontent.com/Kimsi1/Iot_home_automation/master/diagram.jpg)


# Description

Sensor logs temperature, pressure and humidity. These values are displayed in the user interface.
Interface also has buttons to turn light on and off.

There is also a feature, that when the temperature goes over 35 degrees celsius, the light turns red, and a text "Too hot!" is displayed in the interface.


![My image](https://raw.githubusercontent.com/Kimsi1/Iot_home_automation/master/Screenshot.jpg)

