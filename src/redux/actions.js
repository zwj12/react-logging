import { GET_LOGDATA, GET_LOGFILELIST, SWITCH_PAGE, GET_SPOTWELDDATA} from "./actionTypes";

export const getLogData = (robName, year, month, date, logMessages) => ({
    type: GET_LOGDATA,
    payload: { robName, year, month, date, logMessages }
});

export const getLogFileList = (fileNameList) => ({
    type: GET_LOGFILELIST,
    payload: { fileNameList }
});

export const switchPage = (page) => ({
    type: SWITCH_PAGE,
    payload: { page }
});

export const getSpotWeldData = (spotWeldArray) => ({
    type: GET_SPOTWELDDATA,
    payload: { spotWeldArray }
});