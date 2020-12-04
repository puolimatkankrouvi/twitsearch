import React from 'react';
import {connect} from "react-redux";
import TweetList from "../TweetList";
import SaveSearchDialog from "./SaveSearchDialog";
import SearchBarContainer from "./SearchBarContainer";

const body = (props) => {
	return <div>
		<SearchBarContainer />       
		<TweetList />
		{props.searchResult ? <SaveSearchDialog /> : null}
	</div>
};

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(body);