import React from 'react'


class DailyTipOutForm extends React.Component{
  constructor(){
  super()
  this.state={
    date:"",
    tipAmount:"",
    savingsRate:"",
  }
}
onDateInput=(e)=>{
  this.setState({date: e.target.value});
}
onTipAmountInput=(e)=>{
  this.setState({tipAmount: e.target.value});
}
onSavingsRateSelection=(e)=>{
  this.setState({savingsRate: e.target.value})
}

handleClick=()=>{
    fetch("http://localhost:8080/dailytipout", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date:this.state.date,
        savingsRate: this.state.savingsRate,
        tipAmount:this.state.tipAmount
      })
    }).then(()=>{
      this.props.getDataFromAPI();
    })
}


render(){
  return(
    <div>
      <input type="date" required pattern="\d{4}-\d{2}-\d{2}" onInput={this.onDateInput} placeholder="Date"/>
      <input type="number" onInput={this.onTipAmountInput} placeholder="Tip Amount"/>
      <select onChange={this.onSavingsRateSelection}>
        <option value="">Savings Rate</option>
        <option value=".1">10%</option>
        <option value=".15">15%</option>
        <option value=".2">20%</option>
        <option value=".25">25%</option>
      </select>

      <button onClick={this.handleClick}>Save!</button>
    </div>
  )
}
}

export default DailyTipOutForm
