export function MainView(props){
  return (
    <div>
      <button onClick={onButtonClickACB}>Search for votings</button>
      <div>
        { (props.voteringsArr !== []) ? props.votingsArr.map(getLineForDocACB) : "Inga dokument" }
      </div>
    </div>
    );


    function onButtonClickACB(event){
      props.onSearchForVotingsACB();
    }

    function getLineForDocACB(doc){
      return (
        <div key={doc.dok_id}>Tid: {doc.publicerad}. Titel: {doc.titel}</div>
      );
    }

}
