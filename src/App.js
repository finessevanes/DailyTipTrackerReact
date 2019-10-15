import React from 'react'
import './App.css'
import Moment from 'react-moment';
import 'moment-timezone';
import TipForm from './components/TipForm'

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

  componentDidMount(){
    this.getDataFromAPI();
  }

  render(){
    let tipElementArr = this.state.tips.map((tip)=>{
      return <div key={tip.id}>
        Date: <Moment format="MMMM DD YY" withTitle>{tip.date}</Moment>
        Tip Amount: ${tip.tipAmount}
        Savings Rate: {tip.savingsRate*100}%
        Amount Saved: ${Math.ceil(tip.tipAmount*tip.savingsRate)}
      </div>
    })
    return(
      <div>
      {tipElementArr}
      <TipForm getDataFromAPI={this.getDataFromAPI}/>
      </div>
    )
  }
}

export default App
