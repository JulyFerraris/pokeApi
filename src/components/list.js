import React from 'react'
import Detail from './detail'
import Header from './header'
import ListItem from './listItem'
import Pagination from './pagination'

import './list.css'


class List extends React.Component {
   
	constructor(props) {
      super(props);
      this.state = {
         data: [],
			isLoading: true,
			count: 0,
			showDetail: false,
			offset: 0,
			limit: 5,
			language: 'es',
      }
   }

	componentDidMount() {
		this._fetchPokemonsListData()
	}
	
   _fetchPokemonsListData = () => {
		let {offset,limit} = this.state
		const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
		fetch(url)
		.then(res => res.json())
		.then(json => {
			this.setState({
				data:json.results,
				count: json.count,
				isLoading: false
			})
		})
		.catch(error => console.error('Error:', error))
	}

	_showDetail = (url) => {
		this.setState({ 
			showDetail: !this.state.showDetail,
			pokemonUrl: url
		})
	}

	_showList = () => { 
		const {data} = this.state
		if(data.length === 0) return null
		return data.map((item, idx) => <ListItem
			name={item.name}
			key={idx}
			url= {item.url}
			showDetail={()=>this._showDetail(item.url)}
			/>
		)
	}

	_showPrevPage = () => {
		let {offset,limit} = this.state
		if(offset === 0) return null;
		offset-= limit
		this.setState({
			offset,
			showPrevButton: true,
		}, () => {
		  this._fetchPokemonsListData();
		})
	}

	_showNextPage = () => {
		let {offset,limit,count} = this.state
		if(offset === limit - count) return null;
		offset+= limit
		this.setState({
			offset
		}, () => {
		  this._fetchPokemonsListData();
		})
	}

	_changeLanguage = (e) => {
		this.setState({
			language: e
		})
	}


	
	render(){
		const isLoading = this.state.isLoading

		if(isLoading) return <div className="loading"><img src="../images/pokebola.svg" alt="pokebola"  /></div>

		return <>
			<Header action={this._changeLanguage}/>
	
			<div className="list">
            {this._showList()}
			</div>

			{this.state.showDetail ? 
				<Detail 
					showDetail={this._showDetail} 
					pokemonUrl={this.state.pokemonUrl} 
					language= {this.state.language}
				/> 
			: null}
			
			<Pagination
            prevPage={this._showPrevPage}
            nextPage={this._showNextPage}
				offset={this.state.offset}
         />
		</>
		
	}
}

export default List;