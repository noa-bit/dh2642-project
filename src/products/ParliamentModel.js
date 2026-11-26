import { searchDocuments } from "./govSource.js";

export const model = {


  searchParams: { sok: "", utformat: "json", doktyp: ""},

  setDoktyp(type) { this.searchParams["doktyp"] = type; },


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


  getVotings(){
   
    this.setDoktyp("votering");

    return searchDocuments(this.searchParams);
  }


}
