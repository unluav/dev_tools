/* app main imports */
import React, { Component } from 'react';						//the curly braces just means import the one thing instead of the entire library
import PropTypes from 'prop-types';								//lets us define required properties for a given component


/* main application */
class Index extends Component{
	render(){
		return(
			<div>
				<center>
					<h1>Index or main entry to your app...</h1>
					<p>This is where you place the dashboards, menus, topbars, etc...</p>
				</center>
			</div>
		)
	};
}

/* enable the socket context */
Index.contextTypes = {
	socket: PropTypes.object.isRequired
};

/* export the component */
export default Index;