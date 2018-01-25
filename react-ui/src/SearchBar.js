import React, { Component } from 'react';
import Redux from 'redux';
import Search from 'react-search-box';


class SearchBar extends Component{



	render(){
		<div className="SearchBar">
			<Search
            	data={ this.state.data }
            	onChange={ this.handleChange.bind(this) }
            	placeholder="hakusana"
            	class="search-class"
            	searchKey="query"
			/>
		</div>
	}
}
