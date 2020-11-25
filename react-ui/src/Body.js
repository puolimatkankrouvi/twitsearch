import React from 'react';
import {connect} from "react-redux";
import './Body.css';
import TweetList from "./TweetList";
import SaveSearchDialog from "./SaveSearchDialog";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const body = (props) => {
	return <body>       
		<TweetList />
        <SaveSearchDialog />
	</body>
};

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(body);