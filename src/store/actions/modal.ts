import { StandardAction } from "../common";
export const SHOW_MODAL: string = "SHOW_MODAL";
export const HIDE_MODAL: string = "HIDE_MODAL";
export const modalOperation = {
    showModal: (name: string, modalProps: any): StandardAction => {
        return {
            type: SHOW_MODAL,
            payload: {name, modalProps},
        };
    },
    hideModal: ():
        StandardAction => {
        return {
            type: HIDE_MODAL
        };
    }
};