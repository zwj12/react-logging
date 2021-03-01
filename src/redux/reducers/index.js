import { combineReducers } from "redux";
import logData from "./logData";
import logFileList from "./logFileList";

export default combineReducers({ logData, logFileList });
