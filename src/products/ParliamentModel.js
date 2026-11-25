export const model = {

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



}
