export function resolvePromise(promise, promiseState, callback = ()=>{}){
  /*
    console.log("promiseState:", promiseState);
  console.log("is object:", typeof promiseState);
  console.log("frozen:", Object.isFrozen(promiseState));
  console.log("promise descriptor:",
    Object.getOwnPropertyDescriptor(promiseState, "promise")
  );
  */




  promiseState.promise = promise;
  promiseState.data = null;
  promiseState.error= null;

  function successACB(result){
    if(promiseState.promise===promise){
      promiseState.data= result;
      
      //Callback we give it to run when the promise is resolved
      callback();
    }
  }
  function failureACB(error){
    if(promiseState.promise===promise){
      promiseState.error= error;
    } 
  }

  promiseState.promise?.then(successACB).catch(failureACB);
  
  return true;
}
