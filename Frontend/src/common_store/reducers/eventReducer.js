import { FILL_EVENT_DETAILS_LIST } from "../constants/action-types";


const initialState = {
  eventDetailsList : null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FILL_EVENT_DETAILS_LIST:
        return {...state, eventDetailsList : action.payload}
      default:
        return state;
    }
  };