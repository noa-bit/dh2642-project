
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";


// NaivePresenter, only to try it 
import { MainPresenter } from "../presenters/mainPresenter.jsx";

const App = observer( 

  function AppRoot(props){
    return (<MainPresenter model={props.model}/>);
  }

)

export {App};
