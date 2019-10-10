import React from 'react';
import './App.css';
import DailyTipOutForm from './components/DailyTipOutForm'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ShowDailyTipOuts from './components/ShowDailyTipOuts'
import ShowDailyTipOut from './components/ShowDailyTipOut'


 class App extends React.Component{
   constructor(){
     super()
     this.state= {
       dailyTipOuts:[]
     }
   }
  getDataFromAPI=()=>{
    fetch("http://localhost:8080/dailytipouts")
    .then((res) => res.json())
    .then((response)=>{
      this.setState({dailyTipOuts:response});
    });
  }
  componentDidMount(){
    this.getDataFromAPI();
  }
  render(){
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link id="show_daily_tip_outs" to="/">**Show All Tips**</Link>
              </li>
              <li>
                <Link id="create_daily_tip_out" to="/create">__Add Tips__</Link>
              </li>
            </ul>
          </nav>
          <div id="content_body">
          <Switch>
            <Route path="/dailytipout/:id" render={(props)=>(
              <ShowDailyTipOut {...props} getDataFromAPI={this.getDataFromAPI}/>
            )}/>
            <Route path="/edit/dailytipout/:id" render={(props)=>(
              <DailyTipOutForm {...props} getDataFromAPI={this.getDataFromAPI}/>
            )}/>
            <Route path="/create">
              <DailyTipOutForm getDataFromAPI={this.getDataFromAPI} />
              </Route>
            <Route exact path="/">
              <ShowDailyTipOuts getDataFromAPI={this.getDataFromAPI} dailyTipOuts={this.state.dailyTipOuts} />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
  );
  }
}

export default App;
