import React from 'react';
import axios from 'axios'
import Header from './header'




class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      sensor: 'sensor',
      gx: '', 
      gy: '',
      gz: '',
      lightOn: false
    }
  }

  componentDidMount=()=> {
    console.log('did mount')
    axios
      .get('/api/reading')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ data: response.data })
      })
  }
        
  lightsOn=()=> {
    axios
      .get('/api/lightson')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({lightOn: true})
        
      })

  }

  lightsOff=()=> {
    axios
      .get('/api/lightsoff')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({lightOn: false})
        
      })

  }

  render() {
    return (
      <div style = {divStyle}>
        <Header />
        <h1>Temperature</h1>
        <h3>{this.state.data.map(data => data.gx)} °C</h3>
        <h1>Pressure</h1>
        <h3>{parseInt(this.state.data.map(data => data.gy))/1000} kPa</h3>
        <h1>Humidity</h1>
        <h3>{this.state.data.map(data => data.gz)} %</h3>

      
        <button onClick={this.lightsOn}>lights On</button>
        <button onClick={this.lightsOff}>lights Off</button>
      </div>
    );
  }
}

const divStyle = {
  background: '#fff',
  color: '#333',
  textAlign: 'center',
  padding: '10px'
}




export default App;