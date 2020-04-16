import { FILL_MSG_DETAILS_LIST } from "../constants/action-types";


const initialState = {
  msgDetailsList : null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FILL_MSG_DETAILS_LIST:
        return {...state, msgDetailsList : action.payload}
      default:
        return state;
    }
  };