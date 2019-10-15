import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';

class ShowTips extends React.Component{
  constructor(){
    super()
    this.state = {
      tips: []
    }
  }
  handleDeleteClick=(id)=>{
    fetch('http://localhost:8080/tip/'+ id, {
      method: 'delete',
    }).then(()=>{
        this.props.getDataFromAPI();
    })
  }

  componentDidMount(){
    this.props.getDataFromAPI();
  }
  render(){
    let tipElementArr = this.props.tips.map((tip)=>{
      return (
        <div key={tip.id}>
        Date: <Moment format="MMMM DD YY" withTitle>{tip.date}</Moment>
        Tip Amount: ${tip.tipAmount}
        Savings Rate: {tip.savingsRate*100}%
        Amount Saved: ${tip.amountSaved}
        <button onClick={()=>this.handleDeleteClick(tip.id)}>Delete</button>
      </div>
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
