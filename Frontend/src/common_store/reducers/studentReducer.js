import { FILL_STUDENT_BASIC_DETAILS, FILL_STUDENT_EDUCATION_DETAILS, FILL_STUDENT_EXPERIENCE_DETAILS,
  FILL_STUDENT_IMAGE_DETAILS, FILL_STUDENT_RESUME_DETAILS
  } from "../constants/action-types";

const initialState = {
    basicDetails : null,
    educationDetails : null,
    experienceDetails : null,
    image : null,
    resume : null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FILL_STUDENT_BASIC_DETAILS:
        return {...state,
                 basicDetails : action.payload}
      case FILL_STUDENT_EDUCATION_DETAILS:
        return {...state, 
                educationDetails : action.payload}
      case FILL_STUDENT_EXPERIENCE_DETAILS:
        return {...state,
                 experienceDetails : action.payload}
      case FILL_STUDENT_IMAGE_DETAILS:
        return {...state,
                image: action.payload}
      case FILL_STUDENT_RESUME_DETAILS:
        return {...state,
                resume: action.payload}
      default:
        return state;
    }
  };