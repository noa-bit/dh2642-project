
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";


// LEO TESTING

// Some basic functionalities, I want to try how the API might be used. 

import { MainPresenter } from "../presenters/mainPresenter.jsx";
import { DocPresenter } from "../presenters/docPresenter.jsx";

const App = observer( 


  function AppRoot(props){
    function makeRouter(model){

      return createHashRouter([
        { 
          path: "/",
          element: <MainPresenter model={props.model}/>,
        },
        {
          path: "/doc",
          element: <DocPresenter model={props.model}/>,
        }
      ])
    }

    return (
      <div>
        <RouterProvider router={makeRouter(props.model)}/>
      </div>
    );
  }

)
// END LEO TESTING

export {App};
