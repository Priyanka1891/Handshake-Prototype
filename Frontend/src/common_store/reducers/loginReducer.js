import {FILL_STUDENT_DETAILS,FILL_EMPLOYER_DETAILS, FILL_BOTH_DETAILS} from "../constants/action-types";


const initialState = {
    employerDetails : null,
    studentDetails : null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FILL_STUDENT_DETAILS:
        return {studentDetails : action.payload}
      case FILL_EMPLOYER_DETAILS:
        return {employerDetails : action.payload}
      case FILL_BOTH_DETAILS:
        return {studentDetails : action.payload.studentDetails, employerDetails : action.payload.employerDetails}
      default:
        return state;
    }
  };