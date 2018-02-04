import React, { Component } from 'react';
import Redux from 'redux';
import Request from 'react-axios';

import SearchBar from './SearchBar';
//import SearchBar from 'material-ui-search-bar';


class SearchBarLogic extends Component{


	handleChange(value){
		//Sends action for changing text
		return{
			type: 'CHANGE_TEXT',
			value
		}

	}

	sendSearch(){
		<Request method="post" url="/search" data={this.state.text} />
	}

	constructor(props){
		super(props);
		this.state = {
			text: '',
			sent: false
		}
	}

	reducer(state=[], action){
		switch(action.type){
			case('COMPLETE_SEARCH'):
				return state.concat([{text: state.text, sent:true}])
			case('CHANGE_TEXT'):
				return state.concat([{text: action.text, sent:false}])
			default:
				return state
		}
	}



	render(){
		return(
			<div className="Search-bar">
				<SearchBar
						onChange={this.handleChange}
						onSubmit={this.sendSearch}
				/>
			</div>
		)
	}
}


export default SearchBarLogic;
