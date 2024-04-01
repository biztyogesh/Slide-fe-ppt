import { ModalState } from "store/reducers/modal";
import { IRextState, getRextState } from "../baseProvider/rext";
import { ApplicationState } from 'store/reducers';
import { IAuthState } from "store/reducers/auth";

export function getToken(state: ApplicationState): string {
  const { token } = state.authState;
  return token || "";
}

export function getBaseUrl(state: ApplicationState): string {
  return `https://dev.keynoteslides.com` // `http://54.241.85.209`;
}

export function getSocketBaseUrl(state: ApplicationState): string {
  return window.origin;  //`http://13.56.218.6`;
}

export function getAuthState(state: ApplicationState): IAuthState {
  return state.authState
}

export function getModalState(state: ApplicationState): ModalState {
  return state.modalState;
}

export const getImageFactoryBulkUploadState = (state: ApplicationState) => getRextState(state.imageFactoryBulkState, {});
export const getImageFactoryManageState = (state: ApplicationState) => getRextState(state.imageFactoryManageState, {});
export const getImageFactoryListState = (state: ApplicationState) => getRextState(state.imageFactoryListState, []);

export const getImageTrainingList = (state: ApplicationState) => getRextState(state.imageTrainingListState, []);

export const getUserListState = (state: ApplicationState): IRextState => getRextState(state.userListState, []);
export const getManageUserState = (state: ApplicationState): IRextState => getRextState(state.manageUserState, {});

export const getPPTData = (state: ApplicationState): IRextState => getRextState(state.getPptForPrompt, [])
export const getTocDataForPrompt = (state: ApplicationState): IRextState => getRextState(state.getTocForPrompt, [])


export const getTempTypeListData = (state: ApplicationState): IRextState => getRextState(state.getTempTypeListState, []);

export const getTemplateListData = (state: ApplicationState): IRextState => getRextState(state.getTemplatesListState, []);
export const getTemplateFormData = (state: ApplicationState): IRextState => getRextState(state.getTemplateFormState, {});

export const getLayoutListData = (state: ApplicationState): IRextState => getRextState(state.getLayoutsListState, []);
export const getLayoutFormData = (state: ApplicationState): IRextState => getRextState(state.getLayoutFormState, {});

export const getTemplateTypeFormData = (state: ApplicationState): IRextState => getRextState(state.getTempTypeFormState, {});
export const getSlidesListData = (state: ApplicationState): IRextState => getRextState(state.getSlidesListState, []);
export const getSlideFormData = (state: ApplicationState): IRextState => getRextState(state.getSlideFormState, {});

export const getPngSvgReportState = (state: ApplicationState): IRextState => getRextState(state.pngSvgReportState, {});
export const getTrainingListDataState = (state: ApplicationState): IRextState => getRextState(state.listTrainingQueueState, []);
export const getTrainedIdDataState = (state: ApplicationState): IRextState => getRextState(state.trainedIdState, {});

export const getLogsListState = (state: ApplicationState): IRextState => getRextState(state.logsState, []);
