import { LOGDATA} from "./actionTypes";

export const getLogData = messages => ({
    type: LOGDATA,
    payload: { messages }
});

