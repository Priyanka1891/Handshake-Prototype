import { FILL_JOB_DETAILS_LIST} from "../constants/action-types";

export function fillJobDetailsList(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: FILL_JOB_DETAILS_LIST, payload };
}
