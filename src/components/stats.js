import React from 'react'
import Progress from './progress'
import './stats.css'

class Stats extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
			stats: [],
      }
   }

   _getStatData = (obj) => {
		let language = this.props.language
      for( let i = 0; i < obj.length ; i++) {
			fetch(obj[i].statUrl)
			.then(res => res.json())
			.then(json => {
				let newName = json.names.filter(names => names.language.name === language).map(names => names.name)
            let stat = {
               tastName: newName[0],
               tastValue: obj[i].statBase
            }
            return this.setState({stats: [...this.state.stats, stat]})
			})
			.catch(error => console.error('Error:', error))
      }
	}

   componentDidMount(){
      this._getStatData(this.props.stats)
   }

   _calcProgress = (value) => (value * 100)/255

   render(){
      return <>
         {this.state.stats.map((stat, index) => (
            <div className="stat" key={index}>
                  <h6 className="stat__name">{stat.tastName}: </h6>
                  <div className="stat__progress">
                     <Progress inner={this._calcProgress(stat.tastValue)}/>
                  </div>
                  <span className="stat__velue">{stat.tastValue}</span>
            </div>
         ))}
      </>
   }
}

export default Stats 