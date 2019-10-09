import React from 'react'
import {Link} from 'react-router-dom'

class DailyTipOutForm extends React.Component{
  constructor(){
  super()
  this.state={
    id:0,
    date:"",
    tipAmount:"",
    savingsRate:"",
  }
}
onIdInput=(e)=>{
  this.setState({id: e.target.value});
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
handleCreateClick=()=>{
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
    this.setState({date:"", tipAmount:"", savingsRate:""})
  })
}
handleUpdateClick=()=>{
  fetch("http://localhost:8080/dailytipout" + this.state.id, {
    method: 'put',
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
    this.setState({date:"", tipAmount:"", savingsRate:"", id:0})
  })
}
componentDidMount(){
  let id = this.props.match ? this.props.match.params.id:0;
  this.setState({ id });
}

render(){
  let buttonAction;
  if( this.state.id ){
    buttonAction = <button onClick={this.handleUpdateClick}>Update Tip</button>
  } else {
    buttonAction = <button onClick={this.handleCreateClick}>Add Tips</button>
  }


  return(
    <div>
      <input type="date" value={this.state.date} onChange={this.onDateInput} placeholder="Date"/>
      <input value={this.state.tipAmount} type="number" onChange={this.onTipAmountInput} placeholder="Tip Amount"/>
      <select value={this.state.savingsRate} onChange={this.onSavingsRateSelection}>
        <option value="">Savings Rate</option>
        <option value=".1">10%</option>
        <option value=".15">15%</option>
        <option value=".2">20%</option>
        <option value=".25">25%</option>
      </select>
      <Link to="/">{buttonAction}</Link>
    </div>
  )
}
}

export default DailyTipOutForm
