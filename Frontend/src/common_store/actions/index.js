import * as constants from "../constants/action-types";

export function fillStudentDetails(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: constants.FILL_STUDENT_DETAILS, payload };
}
export function fillEmployerDetails(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: constants.FILL_EMPLOYER_DETAILS, payload };
}

export function fillBothDetails(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: constants.FILL_BOTH_DETAILS, payload };
}


export function fillOtherStudentDetails(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: constants.FILL_OTHER_STUDENT_DETAILS, payload };
}
