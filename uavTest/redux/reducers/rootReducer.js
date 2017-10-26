import { combineReducers } from 'redux';
import ExampleReducer from './exampleReducer';

const rootReducer = combineReducers({
	//this is where we add other reducers
	example: ExampleReducer
});

export default rootReducer;