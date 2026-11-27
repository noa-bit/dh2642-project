import { searchDocumentList, searchVoteList, searchDocument } from "./govSource.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {

  // search params 
  docSearchParams: { sok: "", utformat: "json", doktyp: ""},
  voteSearchParams: { sz: "5000", utformat: "json"},

  // promise states
  votingDocsPromiseState: {},
  votingListPromiseState: {},
  docPromiseState: {},

  // data structures for gathering data from fetches
  votingDocsArr: [],
  votesArr: [],
  currentDocHtml: "",
  currentDoc: {},

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

    //Saving it in the promiseState
    resolvePromise(
      searchDocumentList(this.docSearchParams),
      this.votingDocsPromiseState,
      ()=>{
        //Saving the specific data we are after in our votingDocsArr when the promiseState is done. 
        if(this.votingDocsPromiseState.data){
          this.setVotingDocsArr(this.votingDocsPromiseState.data.dokumentlista.dokument);
        };
   
      });


    // I (Leo) am not sure how to do this the right way. PromiseState seems useful to gather data
    // abt the (latest) fetch, but I think we need a bigger more "permanent" structure that collects
    // data from multiple fetches, but does not remember everutyhin from every fetch. So now it is
    // kind of duplicate (26 nov 12:13)
    
  },

  searchForVoteList(){
    

    resolvePromise(
      searchVoteList(this.voteSearchParams),
      this.votingListPromiseState,
      ()=>{
        if(this.votingListPromiseState.data){
          this.setVotesArr(this.votingListPromiseState.data.voteringlista.votering);
        }
      });

  },

  searchForDocument(id){
    resolvePromise(
      searchDocument(id),
      this.docPromiseState,
      ()=>{
        if(this.docPromiseState?.data?.dokumentstatus?.dokument?.html){
          this.currentDocHtml = this.docPromiseState.data.dokumentstatus.dokument.html;
        }
      }
    );
  },

  setVotingDocsArr(arr){
    this.votingDocsArr = [...arr];
  },

  setVotesArr(arr){
    this.votesArr = [...arr];
  },

  addToVotingsArr(arr){
    this.votingDocsArr = [...this.votingDocsArr, ...arr];
  },

  getVotingsArr(){
    return [...this.votingDocsArr];
  }

  

}
