import React from 'react';
import './App.css';
import DailyTipOutForm from './components/DailyTipOutForm'


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      dailyTipOut:[]
    }
  }

getDataFromAPI=()=>{
  fetch("http://localhost:8080/dailytipouts")
  .then((res) => res.json())
  .then((response)=>{
    this.setState({dailyTipOut:response});
  });
}
tipHandleClick=(id)=>{
  fetch("http://localhost:8080/dailytipout/" + id, {
    method: 'delete',
  }).then(()=>{
    this.getDataFromAPI();
  })
}
  componentDidMount(){
    this.getDataFromAPI();
  }
  render(){
    let tipOutsElementArr = this.state.dailyTipOut.map((tip)=>{
      return <div
      key={tip.id}>
      Date: {tip.date}
      Tip Amount: {tip.tipAmount}
      Savings Rate: {tip.savingsRate*100}%
      Amount Saved: {tip.amountSaved}
      <button onClick={(event)=>this.tipHandleClick(tip.id)}>Delete Entry</button></div>
    });
    return (
      <div>
        <div>{tipOutsElementArr}</div>
        <DailyTipOutForm getDataFromAPI={this.getDataFromAPI}/>
      </div>
    );
  }
}

export default App;
