import { GET_SPOTWELDDATA } from "../actionTypes";

const initialState = {
    spotWeldList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SPOTWELDDATA: {
            const { spotWeld } = action.payload;
            let spotWeldList = state.spotWeldList.slice();
            spotWeldList[spotWeld.index-1] = spotWeld;
            for (let i = 0; i < spotWeld.index-1; i++) {
                if (spotWeldList[i] === undefined) {
                    spotWeldList[i] = spotWeld;
                    spotWeldList[i].index = -1;
                }
            }
            return {
                ...state,
                spotWeldList: spotWeldList,
            };
        }
        default:
            return state;
    }
}