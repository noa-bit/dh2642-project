import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView.jsx";

export const MainPresenter = observer(
  function MainPresenter(props){
    return (
      <MainView
      votingDocsArr={props.model.votingDocsArr}
      onSearchForVotingsACB={onSearchForVotingsACB}/>
    );

    function onSearchForVotingsACB(){
      console.log("Clicked search for votings :)");

      props.model.searchForVotingDocs();
    }
  }
)
