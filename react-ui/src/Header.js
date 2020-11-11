import React, { Component } from 'react';
import {connect} from "react-redux";
import './Header.css';
import { Button } from "primereact/button";
import "primeflex/primeflex.css";

import SearchBarLogic from './SearchBarLogic'
import Axios from 'axios';

class Header extends Component {  

    constructor() {
        super();
        this.saveSearch.bind = this.saveSearch.bind(this);
    }

    saveSearch(searchResult) {
        const body = {
            tweets: searchResult,
            name: this.props.text,
            date: new Date(),
        };

        Axios.put(`http://localhost:8000/save/`, JSON.stringify(body));
    }

	render(){
		return(
			<div className="Header p-grid">
				<div className="p-col-2 p-lg-4">
					<h1 className="app-title">Twitsearch</h1>
				</div>
				<div className="p-col-10 p-lg-4 search-bar">
					<SearchBarLogic />
				</div>
				<div className="p-col-0 p-lg-4">
                    <Button
                        label="Save search"
                        disabled={!this.props.searchResult}
                        onClick={ev => this.saveSearch(this.props.searchResult)}
                    />
				</div>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
        searchResult: state.searchResult,
        text: state.text,
    };
}

export default connect(mapStateToProps)(Header);
