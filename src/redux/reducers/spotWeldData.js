import { GET_SPOTWELDDATA } from "../actionTypes";

const initialState = {
    spotWeldList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SPOTWELDDATA: {
            const { spotWeld } = action.payload;
            console.log(spotWeld.toString());
            let spotWeldList = state.spotWeldList.slice();
            spotWeldList[spotWeld.index] = spotWeld;
            return {
                ...state,
                spotWeldList: spotWeldList,
            };
        }
        default:
            return state;
    }
}