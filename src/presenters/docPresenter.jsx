import { observer } from "mobx-react-lite";
import { DocView } from "../views/docView.jsx";

export const DocPresenter = observer(
  function DocPresenter(props){
    return (
      <DocView
        doc={props.model.currentDoc}/>
    );
  }
);

