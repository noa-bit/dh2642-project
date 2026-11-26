import { searchDocuments } from "./govSource.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {


  searchParams: { sok: "", utformat: "json", doktyp: ""},

  votingsPromiseState: {},







  //Dummy attribute
  doWeHaveAGovYet : false,

  //Dummy methods
  setHaveGov(val){

    if (!(typeof val === "boolean")){
      throw "setHaveGov did not recieve a bool";
      return;
    }

    this.doWeHaveAGovYet = val;
  },

  sayHello(){ console.log("Hello from parliament!"); },

  
  setDoktyp(type) { this.searchParams["doktyp"] = type; },

  getVotings(){
   
    this.setDoktyp("votering");

    resolvePromise(
      searchDocuments(this.searchParams), 
      this.votingsPromiseState);
  }

  

}
