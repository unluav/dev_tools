/* app main imports */
import React, { Component } from 'react';

/* main application */
class Error404 extends Component{
	render(){
		return(
			<div>
				<center>
					<h1>Oops! Page not found</h1>
					<p>The page you requested was not found or was removed...</p>
				</center>
			</div>
		)
	};
}

/* export the component */
export default Error404;