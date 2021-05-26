import React from 'react'
import './listItem.css'


const ListItem = (props) => {
   return <div className="list__item" onClick={props.showDetail}>
      <div className="pokemon" onClick={props.showDetail}>
         <picture className="pokemon__picture">
            <img alt="{{props.name}}" src={`https://img.pokemondb.net/artwork/large/${props.name}.jpg`}/>
         </picture>
         <p className="pokemon__name ">{props.name}</p> 
      </div>
   </div>
}

export default ListItem