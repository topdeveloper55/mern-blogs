import { makeAutoObservable } from 'mobx';

class UserStore {
	user = null;

	constructor() {
		makeAutoObservable(this);
	}

	setUser(user) {
		this.user = user;
	}
}

export default UserStore;

// const user = {
//     avatarURL: '',
//     name: 'Jon',
//     userName: 'Snow',
//     email: 'jonsnow@ty.io',
// };
