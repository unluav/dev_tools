/* app main imports */
//DIFFERENT THAN THE OTHERS
import React, { Component } from 'react';						//the curly braces just means import the one thing instead of the entire library
import PropTypes from 'prop-types';								//lets us define required properties for a given component
import { render } from 'react-dom';								//this is the fancy thing that creates the virtual dom
import { Router, Route, hashHistory } from 'react-router';		//client side routing
import injectTapEventPlugin from 'react-tap-event-plugin';		//this lets it work on mobile devices
import SocketContext from 'react-socket-context';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import configureStore from './redux/store';
import { Provider } from 'react-redux';


/* component imports */
import Index from './components/index';
import Error404 from './components/error404';

/* global variables and functions */
injectTapEventPlugin();

const initialState = {
	//this is where we put things that we want to store in the redux store
	example: {}
};

const store = configureStore(initialState);


/* main application */
class App extends Component {



	checkSession(nextState, replace, callback) {
		callback();
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
				<Router history={hashHistory}>
					<Route path='/' component={Index} onEnter={this.checkSession.bind(this)} />
					<Route path='*' component={Error404} />
				</Router>
			</MuiThemeProvider>
		);
	}
}

/* enable the socket context */
App.contextTypes = {
	socket: PropTypes.object.isRequired
};

const renderApp = () => {
	/* render the entire app */
	render(
		<SocketContext>
			<Provider store={store}>
				<App />
			</Provider>
		</SocketContext>,

		document.getElementById('app')
	);
}

store.subscribe(renderApp);

renderApp();