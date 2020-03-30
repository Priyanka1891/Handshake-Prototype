import * as constants from "../constants/action-types";

const initialState = {
  employerDetails : null,
  studentDetails : null
}

const rootReducer = (state = initialState, action) => {
  console.log("Reducer: ", action);
  switch (action.type) {
    case constants.FILL_STUDENT_DETAILS:
      return {studentDetails : action.payload}
    case constants.FILL_EMPLOYER_DETAILS:
      return {employerDetails : action.payload}
    case constants.FILL_BOTH_DETAILS:
      return {studentDetails : action.payload.studentDetails, employerDetails : action.payload.employerDetails}
    default:
      return state;
  }
}

export default rootReducer;