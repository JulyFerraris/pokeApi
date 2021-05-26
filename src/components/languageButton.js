import React from 'react'
import './languageButton.css'


const LanguageButton = (props) => {
   const img = `../images/${props.flag}`
   const language = props.language
   const action = props.action

   return <button className="language__button" onClick={() => action(language)}>
      <img src={img} alt={props.altName} />
   </button>
}

export default LanguageButton;