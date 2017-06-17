import React, { Component } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const url = 'localhost:8000';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messages: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.sock = io(url);
  }

  onChange(e) {
    this.setState({message: e.target.value});
    console.log(this.state.message);
  }

  onSubmit(e) {
    this.setState({messages: this.state.messages.concat(this.state.message)});
    e.preventDefault();
    console.log(this.state.messages);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Live Chat Example</h2>
        </div>
        <div className="chatbox-wrapper">
          <div>
           {this.state.messages.map((message) => {
             return(
               <div>
                 {message}
               </div>
             )
           })}
          </div>
          <form onSubmit={this.onSubmit}>
            <input type="text" name="message" className="chatbox-input" value={this.state.message} onChange={this.onChange} />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
