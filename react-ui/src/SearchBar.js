import React, { Component } from 'react';

class SearchBar extends Component {
	render() {
		return(
			<form onSubmit={this.props.handleSubmit}>
				<input name='search_text' onChange={ev => this.props.handleChange(ev.target.value)} placeholder="Search..." autoFocus />
				<input type="button" onClick={this.props.handleSubmit} value="Go" className="btn btn-default" />
			</form>
		)
	}
}

export default SearchBar;
