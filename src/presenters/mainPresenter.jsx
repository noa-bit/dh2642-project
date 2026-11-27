import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView.jsx";

export const MainPresenter = observer(
  function MainPresenter(props){
    return (
      <MainView
      votingDocsArr={props.model.votingDocsArr}
      onSearchForVotingsACB={onSearchForVotingsACB}
      onChooseDocumentACB={onChooseDocumentACB}/>
    );

    function onSearchForVotingsACB(){
      props.model.searchForVotingDocs();
    }

    function onChooseDocumentACB(id){

      props.model.searchForDocument(id);
    }
  }
)
