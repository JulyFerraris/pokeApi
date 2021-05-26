import React from 'react'
import LanguageButton  from './languageButton'

import './language.css'

const Language = (props) => {
   return <div className="language">
      <LanguageButton action={props.action} flag="es.svg" language="es" altName="Idioma Español"/>
      <LanguageButton action={props.action} flag="en.svg" language="en" altName="Idioma Ingles"/>
   </div>
}

export default Language;