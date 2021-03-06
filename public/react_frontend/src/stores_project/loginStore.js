import { observable, action } from 'mobx';
//import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class LoginStore extends StoreComponent{

  @observable loginView;//bool
  @observable username;
  @observable password;
  @observable loginInProgress;
  //@observable updatingUserErrors;
  
  @action login(){
     //get appropriate agent
     
     const agent = this.parent.agent_object;
     if(agent == 'undefined'){
     	console.log("login store on load hero did not find agent_object in parent");
     	return;
     }
     
     this.loginInProgress = true;
     const userStore = this.parent.userStore;
    
     const userLogin = {username: this.username, password: this.password} ;
     //send post object api request
     return agent.postObject( "login", userLogin)
     .then(action(( user ) => { 
     userStore.users[0]= user ;
     userStore.currentUserId = 0;}))
     .then(action(() => { this.loginInProgress = false; }))
 } 
  @action handleUsernameChange = (event) =>{
  
     this.username = event.target.value;
     
  }
  @action switchLogin = (login) => {
 
     this.loginView = login;
     console.log( "switch login" );
     console.log( "new " + this.loginView);

 }
 @action Trylogin = () => {
    
     console.log("try login call" );
   
     this.login()
     .then( action( () => this.switchLogin(false) )); 
     
 } 
  
}