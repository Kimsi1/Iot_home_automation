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


![My image](https://github.com/Kimsi1/Iot_home_automation/blob/master/Iot_home_automation_diagram.jpg|alt=diagram)


