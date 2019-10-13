import React from 'react'
import './App.css'
import Moment from 'react-moment';
import 'moment-timezone';




class TipForm extends React.Component{
  constructor(){
    super()
    this.state={
      date:"",
      tipAmount:"",
      savingsRate:""
    }
  }

  handleDateChange=(e)=>{
    this.setState({date : e.target.value})
  }
  handleTipAmountChange=(e)=>{
    this.setState({tipAmount : e.target.value})
  }
  handleSavingsRateChange=(e)=>{
    this.setState({savingsRate : e.target.value})
  }
  render(){
    console.log(this.state.date)
    return(
      <div>
        <input type="date" onInput={this.handleDateChange} placeholder="Date"/>
        <input type="number" onInput={this.handleTipAmountChange} placeholder="Tip Amount"/>
        <select onInput={this.handleSavingsRateChange}>
        <option>Savings Rate</option>
          <option value=".15">15%</option>
          <option value=".2">20%</option>
          <option value=".3">25%</option>
        </select>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      tips: []
    }
  }

  componentDidMount(){
    fetch("http://localhost:8080/tips")
    .then((res) => res.json())
    .then((response)=>{
      this.setState({tips:response})
    });
  }


  render(){
    let tipElementArr = this.state.tips.map((tips)=>{
      return <div key={tips.id}>
        Date: {tips.date},
        Tip Amount: {tips.tipAmount},
        Savings Rate: {tips.savingsRate}
      </div>
    })
    return(
      <div>
      <TipForm />
      {tipElementArr}
      </div>
    )
  }
}

export default App
