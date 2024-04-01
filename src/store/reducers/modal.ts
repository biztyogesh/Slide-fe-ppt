import { SHOW_MODAL, HIDE_MODAL } from "../actions";
import {StandardAction , DEFAULT_INITIAL_ACTION_STATE} from "../common"
import { IModalProps } from "interface";

export interface ModalState {
  name: string;
  modalProps: IModalProps
}
const INITIAL_STATE: ModalState = {
  name: undefined!,
  modalProps: undefined!
};
export default (state: ModalState = INITIAL_STATE, action: StandardAction =  DEFAULT_INITIAL_ACTION_STATE): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, action.payload);
    case HIDE_MODAL:
      return Object.assign({});
    default:
      return state;
  }
};