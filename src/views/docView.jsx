export function DocView(props){
  
  function onGoHome(event){
    window.location.hash="#/";
  }


  return(
    <div>
      <div><button onClick={onGoHome}>go home</button></div>
      {
      props.doc?.rubrik ? (
        <div>
          <div>{props.doc.rubrik}</div>
          <div>En godtycklig folkvald:</div>
          {getMemberRow(props.doc.ledamoter[45])}
          <div>En till:</div>
          {getMemberRow(props.doc.ledamoter[261])}
        </div>) :
        (<div>NO DOCUMENT</div>)
      }
    </div>
  );

  function getMemberRow(member){
    return (
      <div>{member.namn}, vote: {member.rost} 
      {(member.rost === "Frånvarande") ? 
          ". Vafan tänker du inte dyka upp o rösta för ditt land " + member.namn + "?" :
          ". Tack för din röst " + member.namn + "."}
      </div>
    )
  }

}
