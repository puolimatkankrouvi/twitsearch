import React, { Component } from 'react';
import {InputText} from "primereact/inputtext"
import {Button} from "primereact/button";

class SearchBar extends Component {
	render() {
		return(
			<div>
			<InputText
				value={this.props.searchText}
				onChange={this.props.handleChange}
				placeholder={"...Search from tweets"}
			/>
			<Button
				label={"Search"}
				onClick={this.props.handleSubmit}
			/>
			</div>
		)
	}
}

export default SearchBar;