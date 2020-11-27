import React from 'react';
import {connect} from "react-redux";
import './Body.css';
import TweetList from "./TweetList";
import SaveSearchDialog from "./SaveSearchDialog";
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const body = (props) => {
	return <body>       
		<TweetList />
		{props.searchResult ? <SaveSearchDialog /> : null}
	</body>
};

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(body);