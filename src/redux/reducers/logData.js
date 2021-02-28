import { LOGDATA } from "../actionTypes";

const initialState = {
    messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGDATA: {
            const { messages } = action.payload;
            return {
                ...state,
                messages: messages,
            };
        }
        default:
            return state;
    }
}