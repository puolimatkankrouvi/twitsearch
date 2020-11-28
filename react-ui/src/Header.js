import React, { Component } from 'react';
import './Header.css';
import { Menubar } from "primereact/menubar";

export default class Header extends Component {

	render(){
		const title = <h1 className="app-title">Twitsearch</h1>;
		return(
			<div>
			<Menubar
				/*style={{
					backgroundColor: "#1a237e",
					color: "white",
				}}*/
				start={title}
			/>
			</div>
		)
	}

}
