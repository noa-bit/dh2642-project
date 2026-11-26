import { searchDocuments, searchVoteList } from "./govSource.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {


  docSearchParams: { sok: "", utformat: "json", doktyp: ""},

  voteSearchParams: { sz: "5000", utformat: "json"},

  votingDocsPromiseState: {},

  votingDocsArr: [],


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
  
  setDoktyp(type) { this.docSearchParams["doktyp"] = type; },

  searchForVotingDocs(){
   
    this.setDoktyp("votering");

    //The search promise
    const prms = searchDocuments(this.docSearchParams);

    //Saving it in the promiseState
    resolvePromise(
      prms, 
      this.votingDocsPromiseState);
   
    //Saving the specific data we are after in our votingDocsArr when the promiseState is done. 
    prms.then(() => {
      if(this.votingDocsPromiseState.data){
        this.setVotingsArr(this.votingDocsPromiseState.data.dokumentlista.dokument);
      }
    });


    // I (Leo) am not sure how to do this the right way. PromiseState seems useful to gather data
    // abt the (latest) fetch, but I think we need a bigger more "permanent" structure that collects
    // data from multiple fetches, but does not remember everutyhin from every fetch. So now it is
    // kind of duplicate (26 nov 12:13)
    
  },

  searchForVoteList(){
    
    searchVoteList(this.voteSearchParams);

  },

  setVotingsArr(arr){
    this.votingDocsArr = arr;
  },

  addToVotingsArr(arr){
    this.votingDocsArr = [...this.votingDocsArr, ...arr];
  },

  getVotingsArr(){
    return [...this.votingDocsArr];
  }

  

}
