import { FILL_JOB_DETAILS_LIST } from "../constants/action-types";


const initialState = {
  jobDetailsList : null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FILL_JOB_DETAILS_LIST:
        return {...state, jobDetailsList : action.payload}
      default:
        return state;
    }
  };