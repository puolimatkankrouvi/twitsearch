import React from 'react';
import {connect} from "react-redux";
import './Body.css';
import TweetList from "./TweetList";


class Body extends React.PureComponent{
	render(){
		return <div className="Body">
			<TweetList
				searchResult={this.props.searchResult}
			/>
			{this.props.searchResult ? JSON.stringify(this.props.searchResult): null}
		</div>
	}
}

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(Body);