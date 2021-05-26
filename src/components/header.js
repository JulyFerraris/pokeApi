import React from 'react'
import Language from './language'

import './header.css'

const Header = (props) => {
   return (
      <div className="header">
         <img src="../images/logo.png" alt="pokeApi logo" className="header__logo"/>     
         <Language action={props.action} />
      </div>
   )
}

export default Header;