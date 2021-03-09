import { combineReducers } from "redux";
import logData from "./logData";
import logFileList from "./logFileList";
import switchPage from "./switchPage";
import spotWeldData from "./spotWeldData";

export default combineReducers({ logData, logFileList, switchPage, spotWeldData });
