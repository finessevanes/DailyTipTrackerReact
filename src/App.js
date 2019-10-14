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
  handleSaveClick=()=>{
    fetch('http://localhost:8080/tip', {
      method: 'post',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        date: this.state.date,
        tipAmount: this.state.tipAmount,
        savingsRate: this.state.savingsRate})
    }).then(()=>{
        this.props.getDataFromAPI();
    })
  }

  render(){
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
        <button onClick={this.handleSaveClick}>Save Tips</button>
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
        Date: <Moment format="MMM DD YY" withTitle>
      {tip.date}
  </Moment>,
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
