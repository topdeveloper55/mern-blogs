import UserStore from './user.store';

/* Import all stores here */
class RootStore {
    constructor() {
        this.userStore = new UserStore(this);
    }
}

export default new RootStore();
