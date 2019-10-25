import React from 'react';
import {connect} from "react-redux";
import './Body.css';


class Body extends React.PureComponent{
	render(){
		return <div className="Body">
			{this.props.searchResult ? JSON.stringify(this.props.searchResult): ""}
		</div>
	}
}

function mapStateToProps(state) {
	return {searchResult: state.searchResult};
}

export default connect(mapStateToProps)(Body);