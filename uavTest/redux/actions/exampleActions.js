var ExampleActions = {
	setUserState: function(user) {
		return {
			type: 'SET_USER_STATE',
			user: user
		};
	},
	setUserAccess: function(accesses){
		console.log("Setting access");
		return {
			type: 'SET_USER_ACCESSES',
			accesses: accesses
		}
	}
};

export default ExampleActions;