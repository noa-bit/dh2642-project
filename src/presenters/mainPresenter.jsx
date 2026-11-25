import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView.jsx";

export const MainPresenter = observer(
  function MainPresenter(props){
    return (
      <MainView
      govYet={props.model.doWeHaveAGovYet}/>
    );
  }
)
