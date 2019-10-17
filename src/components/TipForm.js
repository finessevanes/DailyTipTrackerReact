import React from 'react'
import { Link } from "react-router-dom";

class TipForm extends React.Component{
  constructor(){
    super()
    this.state={
      id: 0,
      date:"",
      tipAmount:"",
      savingsRate:"",
      amountSaved:""
    }
  }
  onIdInput=(e)=>{
    this.setState({id : e.target.value})
  }
  onDateInput=(e)=>{
    this.setState({date : e.target.value})
  }
  onTipAmountInput=(e)=>{
    this.setState({tipAmount : e.target.value})
  }
  onSavingsRateInput=(e)=>{
    this.setState({savingsRate : e.target.value})
  }
  onAmountSavedInput=(e)=>{
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
  handleUpdateClick=()=>{
    fetch('http://localhost:8080/tip/' + this.state.id, {
      method: 'put',
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
        this.setState({date:"", tipAmount:"", savingsRate:"", amountSaved:"", id:0})
    })
  }
  render(){
    let idInput="";
    let buttonAction;
    if (this.props.action === "update"){
      buttonAction = <button className="formElem btnForm" onClick={this.handleUpdateClick}>Update Tips</button>
      idInput = <input className="formElem" type="number" value={this.state.id} onChange={this.onIdInput} placeholder="ID"/>
    } else {
      buttonAction = <button className="formElem btnForm" onClick={this.handleSaveClick}>Save Tips</button>
    }
    return(
        <div className="contentContainer">
          {idInput}
          <input className="formElem" type="date" value={this.state.date} onChange={this.onDateInput}/>
          <input className="formElem" type="number" value={this.state.tipAmount} onChange={this.onTipAmountInput} placeholder="Tip Amount"/>
          <select className="formElem" value={this.state.savingsRate} onChange={this.onSavingsRateInput}>
            <option>Savings Rate</option>
            <option value=".15">15%</option>
            <option value=".2">20%</option>
            <option value=".3">25%</option>
          </select>
          <input className="formElem" value={this.state.amountSaved} type="number" placeholder={Math.ceil(this.state.tipAmount*this.state.savingsRate)} onChange={this.onAmountSavedInput} />
          <Link to="/tips/">{buttonAction}</Link>
        </div>

    )
  }
}

export default TipForm;
