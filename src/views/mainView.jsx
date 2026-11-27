export function MainView(props){
  return (
    <div>
      <button onClick={onButtonClickACB}>Search for votings</button>
      <div>
        { (props.votingDocsArr.length > 0) ? props.votingDocsArr.map(getLineForDocACB) : "Inga dokument" }
      </div>
    </div>
    );


    function onButtonClickACB(event){
      props.onSearchForVotingsACB();
    }

    function getLineForDocACB(doc){
      return (
        <div key={doc.dok_id}>
          <div>{doc.titel}</div>
          <div>Tid: {doc.publicerad}, id: {doc.dok_id}
          <button onClick={() => {onChooseACB(doc.dok_id)} }>choose</button>
        </div>
        </div>
      );

      function onChooseACB(id){
        props.onChooseDocumentACB(id); 
      }
    }

}
