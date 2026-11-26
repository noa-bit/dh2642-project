import { searchDocuments } from "./govSource.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {


  searchParams: { sok: "", utformat: "json", doktyp: ""},

  votingsPromiseState: {},

  votingsArr: [],


  //Dummy stuff
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

  //END Dummy stuff
  
  setDoktyp(type) { this.searchParams["doktyp"] = type; },

  searchForVotings(){
   
    this.setDoktyp("votering");

    //The search promise
    const prms = searchDocuments(this.searchParams);

    //Saving it in the promiseState
    resolvePromise(
      prms, 
      this.votingsPromiseState);
   
    //Saving the specific data we are after in our votingsArr when the promiseState is done. 
    prms.then(() => {
      if(this.votingsPromiseState.data){
        this.setVotingsArr(this.votingsPromiseState.data.dokumentlista.dokument);
      }
    });


    // I (Leo) am not sure how to do this the right way. PromiseState seems useful to gather data
    // abt the (latest) fetch, but I think we need a bigger more "permanent" structure that collects
    // data from multiple fetches, but does not remember everutyhin from every fetch. So now it is
    // kind of duplicate (26 nov 12:13)
    
  },

  setVotingsArr(arr){
    this.votingsArr = arr;
  },

  addToVotingsArr(arr){
    this.votingsArr = [...this.votingsArr, ...arr];
  },

  getVotingsArr(){
    return [...this.votingsArr];
  }

  

}
