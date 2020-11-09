import { makeAutoObservable } from 'mobx';
import * as JWT from 'jsonwebtoken';

class UserStore {
	user = null;

	constructor() {
		makeAutoObservable(this);
		const token = sessionStorage.getItem('accessToken');
		
		if(token){
			const decoded = JWT.verify(token, process.env.REACT_APP_JWT_SECRET);
			this.setUser(decoded.data);
		}
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
