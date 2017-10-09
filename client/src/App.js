import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var stringify = require('json-stringify');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', rows: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('/tasks')
      .then(res => res.json())
      .then(rows => this.setState({ rows }));

    fetch('/tasks', {
      method:'post',
      headers: {'Content-Type':'application/json'},
      body:stringify({task_name: this.state.value})
    });
  }

  handleChange(event){
    this.setState({value: event.target.value});
    console.log(stringify({task_name: event.target.value}));
  }

  handleSubmit(event){
    //event.preventDefault();
  }

  handleDelete(id){
    fetch('/tasks', {
      method:'delete',
      headers: {'Content-Type':'application/json'},
      body:stringify({delete_id: id})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="TaskList">
        {this.state.rows.map(row =>
          <div className="Task" key={row.id}>
            <p className="TaskName">{row.name}</p>
            <button className="DeleteTaskB" id={row.id} onClick={() => this.handleDelete(row.id)}>X</button>
          </div>
        )}
        </div>
        <div className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="task_name" value={this.state.value} onChange={this.handleChange} />
            <button type="Submit">Add Task</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
