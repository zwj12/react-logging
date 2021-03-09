import { combineReducers } from "redux";
import logData from "./logData";
import logFileList from "./logFileList";
import switchPage from "./switchPage";

export default combineReducers({ logData, logFileList, switchPage });
