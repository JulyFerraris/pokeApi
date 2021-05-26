import React from 'react'
import Features from './features'
import Stats from './stats'

import './detailData.css'


class DetailData extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
			abilitiesLabel:"",
			experienceLabel:"",
			heightLabel: "",
			statslabel:"",
			typeLabel:"",
			types: [],
			weightLabel:"",
         abilities: [],
      }
   }

	_getCharacteristics = (url, nameState) => {
		let language = this.props.language
		for( let i = 0; i < url.length ; i++) {
			fetch(url[i])
			.then(res => res.json())
			.then(json => {
				let newName = json.names.filter(names => names.language.name === language).map(names => names.name)
				switch(nameState) {
					case 'abilities':
						return this.setState({abilities: [...this.state.abilities, newName[0]]})
					case 'types':
						return this.setState({types: [...this.state.types, newName[0]]})
					default:
						return this.setState({
							abilities: [this.state.abilities],
							types: [this.state.types],
						})
				}
			})
			.catch(error => console.error('Error:', error))
		}
	}


	_getLabelName = (language) => {
      switch(this.props.language) {
         case 'en':
            return this.setState({
					abilitiesLabel:"Abilities",
					experienceLabel: "Experience",
					heightLabel: "Heigh",
					statslabel:"Stats",
					typeLabel:"Type",
					weightLabel: "Weight",
				})
			default:
				return this.setState({
					abilitiesLabel:"Habilidades",
					experienceLabel: "Experiencia",
					heightLabel: "Altura",
					statslabel: "Estadisticas",
					typeLabel:"Tipo",
               weightLabel: "Peso",
            })
      }
   }

	componentDidMount() {
		this._getCharacteristics(this.props.abilities,'abilities')
		this._getCharacteristics(this.props.types,'types')
		this._getLabelName(this.props.language)
	}

	render(){
      return <>
			<div className="detail__col">
				<div className="section section--flex">
					<picture className="pokemonDetail__image">
						<img src={this.props.image} alt={this.props.name}/>
					</picture>
					<div>
						<h1 className="pokemonDetail__name">{this.props.name}</h1>
						<dl className="pokemonDetail__data">
							<dt>{this.state.heightLabel}:</dt> 
							<dd>{this.props.height}cm</dd> 
							<dt>{this.state.weightLabel}:</dt> 
							<dd>{this.props.weight}Kg</dd> 
							<dt>{this.state.experienceLabel}:</dt> 
							<dd>{this.props.experience}</dd> 
						</dl>
					</div>
				</div>
				<div className="section">
					<h5 className="section__title">{this.state.typeLabel}:</h5>
					<Features featuresList={this.state.types} />
				</div>
				<div className="section">
					<h5 className="section__title">{this.state.abilitiesLabel}:</h5>
					<Features featuresList={this.state.abilities} />
				</div>
			</div>
			<div className="detail__col detail__col--highlighted">
				<div className="section">
					<h5 className="section__title">{this.state.statslabel}:</h5>
					<Stats stats={this.props.stats} language= {this.props.language}/>
				</div>
			</div>
 		</>
	}	
}

export default DetailData

