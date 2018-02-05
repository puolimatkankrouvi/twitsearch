import React, { Component } from 'react';
import {createStore} from 'redux';
import Request from 'react-axios';

import {changeText} from './actions.js';
import {search_reducer} from './reducers.js';

import SearchBar from './SearchBar';

let store = createStore(search_reducer);


class SearchBarLogic extends Component{


	handleChange(value){
		//Dispatches action for changing text
		//The value is Proxy now
		store.dispatch(changeText(value));
		console.log(store.getState());
	}

	sendSearch(){
		<Request method="post" url="/search" data={this.state.text} />
	}

	constructor(props){
		super(props);
		this.state = {
			text: '',
			sent: false
		};
		this.handleChange.bind(this);
		this.sendSearch.bind(this);
	}



	render(){
		return(
			<div className="Search-bar">
				<SearchBar
						handleChange={this.handleChange}
						handleSubmit={this.sendSearch}
				/>
			</div>
		)
	}
}


export default SearchBarLogic;
