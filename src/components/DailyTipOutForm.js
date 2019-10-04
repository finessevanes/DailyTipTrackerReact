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
onSavingsRateInput=(e)=>{
  this.setState({savingsRate: e.target.value});
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
      <input type="text" onInput={this.onDateInput} placeholder="Date"/>
      <input type="number" onInput={this.onTipAmountInput} placeholder="Tip Amount"/>
      <input type="number" onInput={this.onSavingsRateInput} placeholder="Savings Rate:'.2' for 20%"/>
      <button onClick={this.handleClick}>Save!</button>
    </div>
  )
}
}

export default DailyTipOutForm
