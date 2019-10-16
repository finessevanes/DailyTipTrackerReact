import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";

class ShowTip extends React.Component{
  constructor(){
    super()
    this.state={
      tip:{}
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    fetch("http://localhost:8080/tip/" + id)
    .then((res) => res.json())
    .then((tipRes)=>{
      this.setState(()=>({ tip:tipRes }))
    });
  }
  handleDeleteClick=(id)=>{
    fetch('http://localhost:8080/tip/'+ id, {
      method: 'delete',
    }).then(()=>{
        this.props.getDataFromAPI();
    })
  }
  render(){
    return(
      <div>
        <div>Date: <Moment format="MMMM DD YY" withTitle>{this.state.tip.date}</Moment></div>
        <div>Tip Amount: ${this.state.tip.tipAmount}</div>
        <div>Savings Rate: {this.state.tip.savingsRate}%</div>
        <div>Amount Saved: ${this.state.tip.amountSaved}</div>
        <Link to="/tips"><button onClick={()=>this.handleDeleteClick(this.state.tip.id)}>Delete</button></Link>
      </div>
    )
  }
}
export default ShowTip
