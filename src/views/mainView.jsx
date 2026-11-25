export function MainView(props){
  return (
    <div>{getOutputText()}</div>
  );

  function getOutputText(){
    if (props.govYet){
      return "We have a government!";
    }
    else {
      return "We still don't have a government :/";
    }
  }
}
