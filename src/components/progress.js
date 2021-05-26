import React from 'react'
import './progress.css'


const Progress = (props) => {
   return <div className="progress">
      <div className="progress__bar" style={{width: props.inner + '%',}}></div>
   </div>
}

export default Progress