
import { PROXY_URL } from "./apiConfig.js";
import { resolvePromise } from "./resolvePromise.js";

const URL = PROXY_URL;


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
  console.log( URL + "?" + (new URLSearchParams(searchParams)).toString());

  return fetch(URL + "?" + (new URLSearchParams(searchParams)).toString())
    .then(respToJsonACB)
    .catch(errorACB);
}
