import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class UserStore extends StoreComponent {

    constructor(){
    super();
    this.testVar = 1;
    }

    @observable users
    @observable currentUserId

    @action update = () =>{
    
       this.testVar = this.testVar + 1;
       
    
   } 
}
 // @observable currentUser;
 // @observable loadingUser;
 // @observable updatingUser;
 //  @observable updatingUserErrors;

  /*
  @action pullUser() {
    this.loadingUser = true;
    return agent.Auth.current()
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.loadingUser = false; }))
  }

  @action updateUser(newUser) {
    this.updatingUser = true;
    return agent.Auth.save(newUser)
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.updatingUser = false; }))
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }

}


export default new UserStore();
*/