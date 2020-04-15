import { FILL_EVENT_DETAILS_LIST} from "../constants/action-types";

export function fillEventDetailsList(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: FILL_EVENT_DETAILS_LIST, payload };
}
