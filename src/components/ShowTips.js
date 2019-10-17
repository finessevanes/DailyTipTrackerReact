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
        <Link className="viewTips" to={"/tip/" + tip.id} key={tip.id}>
          <div className="contentContainer">
            <button className="formElem btnForm"><Moment format="MMMM DD YY" withTitle>{tip.date}</Moment></button>
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
