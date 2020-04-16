import { FILL_STUDENT_BASIC_DETAILS, FILL_STUDENT_EDUCATION_DETAILS, FILL_STUDENT_EXPERIENCE_DETAILS,
  FILL_STUDENT_IMAGE_DETAILS, FILL_STUDENT_RESUME_DETAILS
  } from "../constants/action-types";

export function fillStudentBasicDetails(payload) {
  console.log("dispatching the action here : ", payload);
  return { type: FILL_STUDENT_BASIC_DETAILS, payload };
}

export function fillStudentEducationDetails(payload) {
  console.log("dispatching the action here : ", payload);
  return { type: FILL_STUDENT_EDUCATION_DETAILS, payload };
}

export function fillStudentExperienceDetails(payload) {
  console.log("dispatching the action here : ", payload);
  return { type: FILL_STUDENT_EXPERIENCE_DETAILS, payload };
}

export function fillStudentImageDetails(payload) {
  return { type: FILL_STUDENT_IMAGE_DETAILS, payload };
}

export function fillStudentResumeDetails(payload) {
  return { type: FILL_STUDENT_RESUME_DETAILS, payload };
}