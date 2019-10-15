import React from 'react'
import './App.css'
import TipForm from './components/TipForm'
import ShowTips from './components/ShowTips'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      tips: []
    }
  }
  getDataFromAPI=()=>{
    fetch("http://localhost:8080/tips")
    .then((res) => res.json())
    .then((response)=>{
      this.setState({tips:response})
    });
  }
  render(){
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">View Tips</Link>
              </li>
              <li>
                <Link to="/create">Add Tips</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/create">
              <TipForm getDataFromAPI={this.getDataFromAPI}/>
            </Route>
            <Route exact path="/">
              <ShowTips getDataFromAPI={this.getDataFromAPI} tips={this.state.tips}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
