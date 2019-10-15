import React from 'react'

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
        savingsRate: this.state.savingsRate
      })
    }).then(()=>{
        this.props.getDataFromAPI();
        this.setState({date:"", tipAmount:"", savingsRate:""})
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
        <button onClick={this.handleSaveClick}>Save Tips</button>
      </div>
    )
  }
}

export default TipForm;
