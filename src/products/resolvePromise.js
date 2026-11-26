export function resolvePromise(promise, promiseState){
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
    }
  }
  function failureACB(error){
    if(promiseState.promise===promise){
      promiseState.error= error;
    } 
  }

  promiseState.promise?.then(successACB).catch(failureACB);

}
