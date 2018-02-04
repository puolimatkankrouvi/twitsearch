import React, { Component } from 'react';



class SearchBar extends Component{



	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<input ref="" onChange={this.handleChange} placeholder="Search..." />
				<input type="submit" value="Go" className="btn btn-default" />
			</form>
		)
	}
}

export default SearchBar;
