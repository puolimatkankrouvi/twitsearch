import React, { Component } from 'react';
import {connect} from "react-redux";
import './Header.css';
import { Button } from "primereact/button";
import "primeflex/primeflex.css";

import SearchBarLogic from './SearchBarLogic';
import { setSaveSearchDialogOpen } from './redux/actions';

class Header extends Component {
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
                        label="Save search..."
                        disabled={!this.props.searchResult}
                        onClick={ev => this.props.setSaveSearchDialogOpen(true)}
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


const dispatchToProps = {
    setSaveSearchDialogOpen,
}

export default connect(mapStateToProps, dispatchToProps)(Header);
