const example = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER_STATE':
			return Object.assign({}, state, action.user);
		case 'SET_USER_ACCESSES':
			console.log("reducing access");
			return Object.assign({}, state, action.accesses);
		default:
			return state;
	}
};

export default example;