import { SWITCH_PAGE } from "../actionTypes";

const initialState = {
    page: "Logging",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SWITCH_PAGE: {
            const { page } = action.payload;
            return {
                ...state,
                page: page,
            };
        }
        default:
            return state;
    }
}