import React from 'react';
import './Header.css';
import { Menubar } from "primereact/menubar";
import { useHistory } from "react-router-dom";

export default function Header() {
	const history = useHistory();
	const title = <h1 className="app-title">Twitsearch</h1>;

	function navigateToPage(path) {
		console.info(path);		
		history.push(path);
	}

	const menuItems = [
		{label: "Search", command: () => navigateToPage("/")},
		{label: "History", command: () => navigateToPage("/history")},
	];

	return(
		<Menubar
			start={title}
			model={menuItems}
		/>
	);
}
