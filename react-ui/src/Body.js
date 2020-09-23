import React from 'react';
import {connect} from "react-redux";
import './Body.css';
import TweetList from "./TweetList";


const body = () => {
	return <body>
		<TweetList />
	</body>
};

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(body);