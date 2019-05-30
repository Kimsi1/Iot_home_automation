import React from 'react';
import axios from 'axios'





class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      sensor: 'sensor',
      gx: '', 
      gy: '',
      gz: ''
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
        
      })

  }

  lightsOff=()=> {
    axios
      .get('/api/lightsoff')
      .then(response => {
        console.log('promise fulfilled')
        
      })

  }

  render() {
    return (
      <div>
        <h1>Temperature</h1>
        <h2>{this.state.data.map(data => data.gx)}</h2>

      
        <button onClick={this.lightsOn}>lights On</button>
        <button onClick={this.lightsOff}>lights Off</button>
      </div>
    );
  }
}

export default App;