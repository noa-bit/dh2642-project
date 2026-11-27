
import { PROXY_URL } from "./apiConfig.js";

const DOC_LIST_URL = PROXY_URL + "dokumentlista/";
const DOC_URL = PROXY_URL + "dokument/";
const VOTE_URL = PROXY_URL + "voteringlista/";


function respToJsonACB(resp){ 
  if(!resp.ok){
    throw new Error("rejected promise")
  }
  return resp.json(); }

function errorACB(error){
  throw error;
}


export function searchDocumentList(searchParams){

  // For debuging 
  console.log( DOC_LIST_URL + "?" + (new URLSearchParams(searchParams)).toString());

  return fetch(DOC_LIST_URL + "?" + (new URLSearchParams(searchParams)).toString())
    .then(respToJsonACB)
    .catch(errorACB);
}

export function searchVoteList(searchParams){
  console.log( VOTE_URL + "?" + (new URLSearchParams(searchParams)).toString());

  return fetch(VOTE_URL + "?" + (new URLSearchParams(searchParams)).toString())
    .then(respToJsonACB)
    .catch(errorACB);

}

export function searchDocument(doc_name){
  
  console.log( DOC_URL + doc_name + ".json");

  return fetch(DOC_URL + doc_name + ".json")
    .then(respToJsonACB)
    .catch(errorACB);
  
}
