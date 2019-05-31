import React from 'react';

function HotOrNot(props){
    const temperature = props.temperature
    if (temperature>35){
        return(
            <h3 style = {hotStyle}>
                {temperature} °C Too hot!!
            </h3>
        )
    }
    return(
        <h3 style = {divStyle}>
            {temperature} °C
        </h3>
    )
}
const hotStyle = {
    
    color: '#f00',
    textAlign: 'center',
    padding: '10px'
}
const divStyle = {
    background: '#fff',
    color: '#333',
    textAlign: 'center',
    padding: '10px'
  }
  
export default HotOrNot;






