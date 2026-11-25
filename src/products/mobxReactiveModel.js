
import { observable, configure, autorun, reaction } from "mobx";

import {model} from "./ParliamentModel.js";

export const reactiveModel = observable(model);
