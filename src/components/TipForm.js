import React from 'react'
import { Link } from "react-router-dom";

class TipForm extends React.Component{
  constructor(){
    super()
    this.state={
      date:"",
      tipAmount:"",
      savingsRate:"",
      amountSaved:""
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
  handleAmountSavedChange=(e)=>{
    this.setState({amountSaved: e.target.value})
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
        savingsRate: this.state.savingsRate,
        amountSaved: this.state.amountSaved
      })
    }).then(()=>{
        this.props.getDataFromAPI();
        this.setState({date:"", tipAmount:"", savingsRate:"", amountSaved:""})
    })
  }
  render(){
    return(
      <div>
        <input type="date" value={this.state.date} onChange={this.handleDateChange} placeholder="Date"/>
        <input type="number" value={this.state.tipAmount} onChange={this.handleTipAmountChange} placeholder="Tip Amount"/>
        <select value={this.state.savingsRate} onChange={this.handleSavingsRateChange}>
        <option>Savings Rate</option>
          <option value=".15">15%</option>
          <option value=".2">20%</option>
          <option value=".3">25%</option>
        </select>
        <input
        value={this.state.amountSaved}
        type="number" placeholder={Math.ceil(this.state.tipAmount*this.state.savingsRate)} onChange={this.handleAmountSavedChange} />
        <Link to="/"><button onClick={this.handleSaveClick}>Save Tips</button></Link>
      </div>
    )
  }
}

export default TipForm;
