import {FILL_STUDENT_DETAILS,FILL_EMPLOYER_DETAILS, FILL_BOTH_DETAILS, FILL_OTHER_STUDENT_DETAILS } from "../constants/action-types";


const initialState = {
    employerDetails : null,
    studentDetails : null,
    otherStudentDetails : null
}

export default function(state = initialState, action) {
    console.log("Reducer: ", action);
    switch (action.type) {
      case FILL_STUDENT_DETAILS:
        return {studentDetails : action.payload}
      case FILL_EMPLOYER_DETAILS:
        return {employerDetails : action.payload}
      case FILL_BOTH_DETAILS:
        return {studentDetails : action.payload.studentDetails, employerDetails : action.payload.employerDetails}
      case FILL_OTHER_STUDENT_DETAILS:
        return {studentDetails : action.payload.studentDetails, otherStudentDetails : action.payload.otherStudentDetails}
      default:
        return state;
    }
  };