import { GET_LOGDATA } from "../actionTypes";

const initialState = {
    robName: "",
    year: null,
    month: null,
    date: null,
    logMessages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LOGDATA: {
            const { robName, year, month, date, logMessages } = action.payload;
            return {
                ...state,
                robName: robName,
                year: year,
                month: month,
                date: date,
                logMessages: logMessages,
            };
        }
        default:
            return state;
    }
}