
import { PROXY_URL } from "./apiConfig.js";

const DOC_URL = PROXY_URL + "dokumentlista/";
const VOTE_URL = PROXY_URL + "voteringlista/";


function respToJsonACB(resp){ 
  if(!resp.ok){
    throw new Error("rejected promise")
  }
  return resp.json(); }

function errorACB(error){
  throw error;
}


export function searchDocuments(searchParams){

  // For debuging 
  console.log( DOC_URL + "?" + (new URLSearchParams(searchParams)).toString());

  return fetch(DOC_URL + "?" + (new URLSearchParams(searchParams)).toString())
    .then(respToJsonACB)
    .catch(errorACB);
}

export function searchVoteList(searchParams){
  console.log( VOTE_URL + "?" + (new URLSearchParams(searchParams)).toString());

  return fetch(VOTE_URL + "?" + (new URLSearchParams(searchParams)).toString())
    .then(respToJsonACB)
    .catch(errorACB);

}
