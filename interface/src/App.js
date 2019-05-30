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
        

  render() {
    return (
      <div>
        <h1>Temperature</h1>
        <h2>{this.state.data.map(data => data.gx)}</h2>
      </div>
    );
  }
}

export default App;