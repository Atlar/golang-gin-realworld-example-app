import { observable, action, reaction } from 'mobx';
import StoreComponent from './StoreComponent';

export default class appStatusStore extends StoreComponent {

  APIRootURL;
  @observable appName = 'Conduit';
  @observable appLoaded = false;

  constructor() {
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}
alert(appStatusStore);