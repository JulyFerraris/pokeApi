import React from 'react'
import DetailData from './detailData'

import './detail.css'

class Detail extends React.Component {
   
   constructor(props) {
      super(props);
      this.state = {
         pokemonData: [],
         isLoading: true
      }
   }
   

   _fetchPokemonData = () => {
      const url = this.props.pokemonUrl
      fetch(url)
		.then(res => res.json())
		.then(json => {
			this.setState({
				pokemonData: json,
            isLoading: false
			})
		})
		.catch(error => console.error('Error:', error))
	}


   componentDidMount() {
		this._fetchPokemonData()
	}


   _getUrls = (list, listType) => {
      let arrayAux = []
		for( let i = 0; i < list.length ; i++) {
			let url = list[i][listType].url 
         arrayAux.push(url)
      }
      return arrayAux
   }

   _getStats = (list) => {
      let arrAux = []
      for( let i = 0; i < list.length ; i++) {
         let myObj = {
            "statUrl": list[i].stat.url,
            "statBase": list[i].base_stat
         }
         arrAux = [...arrAux, myObj]
      }
      return arrAux
   }


   render(){
      const data = this.state.pokemonData
      const isLoading = this.state.isLoading

      if(isLoading) return <div className="overlay loading"><img src="../images/pokebola.svg" alt="pokebola" /></div>

      return <>
         <div className="detail" >
            <button onClick={this.props.showDetail} className="detail__close">X</button>
            <div className="detail__body">
               <DetailData
                  experience= {data.base_experience}
                  height= {data.height}
                  image={`https://img.pokemondb.net/artwork/large/${data.name}.jpg`}
                  name= {data.name}
                  weight={data.weight}
                  abilities={this._getUrls(data.abilities,'ability')}
                  stats={this._getStats(data.stats)}
                  types={this._getUrls(data.types,'type')}
                  moves={this._getUrls(data.moves,'move')}
                  language= {this.props.language}
               />
            </div>
         </div>
         <div className="overlay" onClick={this.props.showDetail}></div>
      </>
   }
}

export default Detail