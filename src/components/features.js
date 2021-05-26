import React from 'react'
import './features.css'

const Features = (props) => {
   return(
      <ul className="feature">
         {props.featuresList.map((feature, idx) => <li key={idx} className="feature__item">{feature}</li>)}
      </ul>
   )
}

export default Features 