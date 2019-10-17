import React from 'react'
import { Link } from "react-router-dom";

const Home=()=>{
  return(
    <div>
    <nav>
      <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
        <li>
          <Link to="/tips">View Tips</Link>
        </li>
        <li>
          <Link to="/create">Add Tips</Link>
        </li>
      </ul>
    </nav>
      <p>bartender inspired, greenhaus is a simple way to keep track of your tips and drive you to save</p>
    </div>
  )
}

export default Home
