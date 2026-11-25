import { createRoot } from "react-dom/client";
import { App } from "./app/App.jsx";
import { reactiveModel } from "./products/mobxReactiveModel.js";

createRoot(document.getElementById('root')).render(<App model={reactiveModel}/>);



// For debugging 

window.myModel = reactiveModel;
