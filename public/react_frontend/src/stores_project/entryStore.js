import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class EntryStore extends StoreComponent {

    constructor(){
       super();
    } 

    @observable entries;
    entrylastId;

    @action addEntry(){

        entries.push();
        return entries.length()-1;

    }
    @action AddEntryProject( ProjectId ){

        const NewEntryId = addEntry();
        this.parent.projectStore.addEntryToProject( projectId, NewEntryId );
        return NewEntryId;

    }

}