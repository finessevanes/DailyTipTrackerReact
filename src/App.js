import React from 'react'
import './App.css'
import Moment from 'react-moment';
import 'moment-timezone';
import TipForm from './components/TipForm'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";


class TipApp extends React.Component{
  constructor(){
    super()
    this.state = {
      tips: []
    }
  }
  handleDeleteClick=(id)=>{
    fetch('http://localhost:8080/tip/'+ id, {
      method: 'delete',
    }).then(()=>{
        this.props.getDataFromAPI();
    })
  }

  componentDidMount(){
    this.props.getDataFromAPI();
  }
  render(){
    let tipElementArr = this.props.tips.map((tip)=>{
      return (
        <div key={tip.id}>
        Date: <Moment format="MMMM DD YY" withTitle>{tip.date}</Moment>
        Tip Amount: ${tip.tipAmount}
        Savings Rate: {tip.savingsRate*100}%
        Amount Saved: ${tip.amountSaved}
        <button onClick={()=>this.handleDeleteClick(tip.id)}>Delete</button>
      </div>
    )
  })
    return(
      <div>
      <div>{tipElementArr}</div>
      <TipForm getDataFromAPI={this.props.getDataFromAPI}/>
      </div>
    );
  }
}

const About=()=>{
  return <h2>About</h2>;
}

const Users=()=>{
  return <h2>Users</h2>;
}

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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route exact path="/">
              <TipApp getDataFromAPI={this.getDataFromAPI} tips={this.state.tips}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
