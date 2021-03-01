import { GET_LOGDATA, GET_LOGFILELIST} from "./actionTypes";

export const getLogData = (robName, year, month, date, logMessages) => ({
    type: GET_LOGDATA,
    payload: { robName, year, month, date, logMessages }
});

export const getLogFileList = (fileNameList) => ({
    type: GET_LOGFILELIST,
    payload: { fileNameList }
});
