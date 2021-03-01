import { GET_LOGFILELIST } from "../actionTypes";

const initialState = {
    fileNameList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LOGFILELIST: {
            const { fileNameList } = action.payload;
            return {
                ...state,
                fileNameList: fileNameList,
            };
        }
        default:
            return state;
    }
}