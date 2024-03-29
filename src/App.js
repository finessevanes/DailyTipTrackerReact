import React from 'react'
import './App.css'
import TipForm from './components/TipForm'
import ShowTips from './components/ShowTips'
import ShowTip from './components/ShowTip'
import Home from './components/Home'
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
            <Link to="/"><img src={'https://i.ibb.co/7yR3stg/brandmark-design-1080x0-1.png'}/></Link>
            <Switch>
            <Route path="/tip/:id" render={(props)=>(
              <ShowTip {...props} getDataFromAPI={this.getDataFromAPI}/>
            )}/>
            <Route exact path="/">
              <Home />
            </Route>
              <Route path="/create">
                <TipForm action="create" getDataFromAPI={this.getDataFromAPI}/>
              </Route>
              <Route path="/tips">
                <ShowTips getDataFromAPI={this.getDataFromAPI} tips={this.state.tips}/>
              </Route>
              <Route path="/update">
                <TipForm action="update" getDataFromAPI={this.getDataFromAPI}/>
              </Route>
            </Switch>
          </div>
        </Router>

    );
  }
}

export default App
