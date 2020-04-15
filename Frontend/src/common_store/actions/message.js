import { FILL_MSG_DETAILS_LIST} from "../constants/action-types";

export function fillMsgDetailsList(payload) {
  console.log("dispatching the action here : ", payload)
  return { type: FILL_MSG_DETAILS_LIST, payload };
}
