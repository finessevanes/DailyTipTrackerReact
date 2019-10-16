import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";

class ShowTips extends React.Component{
  constructor(){
    super()
    this.state = {
      tips: []
    }
  }


  componentDidMount(){
    this.props.getDataFromAPI();
  }
  render(){
    let tipElementArr = this.props.tips.map((tip)=>{
      return (
        <Link to={"/tip/" + tip.id} key={tip.id}>
        <div>
        ID: {tip.id}
        Date: <Moment format="MMMM DD YY" withTitle>{tip.date}</Moment>
        Tip Amount: ${tip.tipAmount}
        Savings Rate: {tip.savingsRate*100}%
        Amount Saved: ${tip.amountSaved}
        </div>
      </Link>
    )
  })
    return(
      <div>
      <div>{tipElementArr}</div>
      </div>
    );
  }
}

export default ShowTips
