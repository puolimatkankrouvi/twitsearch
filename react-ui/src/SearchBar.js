import React, { Component } from 'react';
import {InputText} from "primereact/inputtext"
import {Button} from "primereact/button";

class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.onEnterPressed = this.onEnterPressed.bind(this);
	}

	componentDidMount() {
		addEventListener("keydown", this.onEnterPressed);
	}

	render() {
		return(
			<div>
			<InputText
				value={this.props.searchText}
				onChange={ev => this.props.handleChange(ev.target.value)}
				placeholder={"...Search from tweets"}
			/>
			<Button
				label={"Search"}
				onClick={this.props.sendSearch}
			/>
			</div>
		)
	}

	onEnterPressed(ev) {
		if (ev.key.code === "13" && !ev.shiftKey) {
			if (this.props.searchText.length > 0) {
				this.props.sendSearch();
			}
		}
	}
}

export default SearchBar;