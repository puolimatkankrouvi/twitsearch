import React, { Component } from 'react';



class SearchBar extends Component{

	render(){
		return(
			<form onSubmit={this.props.handleSubmit}>
				<input name='search_text' onChange={this.props.handleChange} placeholder="Search..." />
				<input type="submit" value="Go" className="btn btn-default" />
			</form>
		)
	}
}

export default SearchBar;
