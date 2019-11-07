import React from 'react';
import {connect} from "react-redux";
import './Body.css';
import TweetList from "./TweetList";


class Body extends React.PureComponent{
	render(){
		return <body>
			<TweetList />
			{/*this.props.searchResult ? JSON.stringify(this.props.searchResult): null*/}
		</body>
	}
}

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(Body);