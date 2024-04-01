import { combineReducers } from 'redux';
import { IRextReducer } from '../baseProvider/rext';
import {
  generatePptRext, generateTocRext, slidesFormRext,
  slidesListRext, templateFormRext, templateListRext,
  userListRext, layoutListRext,
  templateTypeListRext, templateTypeFormRext, layoutFormRext, imageFactoryListRext, imageFactoryManageRext,
  imageFactoryBulkUploadRext, imageTrainingListRext, manageUserRext, pngSvgRext, listTrainingQueueRext , trainedIdRext, logsRext
} from 'store/rext';
import modalState, { ModalState } from './modal';
import authReducer, { IAuthState } from './auth';

export interface ApplicationState {
  authState: IAuthState,

  imageFactoryListState: IRextReducer;
  imageFactoryManageState: IRextReducer;
  imageFactoryBulkState: IRextReducer;
  imageTrainingListState: IRextReducer;

  userListState: IRextReducer;
  manageUserState: IRextReducer;

  pngSvgReportState: IRextReducer;
  listTrainingQueueState: IRextReducer;
  trainedIdState:IRextReducer;
  logsState:IRextReducer;

  getTocForPrompt: IRextReducer;
  getPptForPrompt: IRextReducer;
  getUserListState: IRextReducer;

  getTemplatesListState: IRextReducer;
  getTempTypeListState: IRextReducer;

  getLayoutsListState: IRextReducer;
  getSlidesListState: IRextReducer;

  getTemplateFormState: IRextReducer;
  getTempTypeFormState: IRextReducer;
  getSlideFormState: IRextReducer;
  getLayoutFormState: IRextReducer;

  modalState: ModalState;
}

const rootReducer = () =>
  combineReducers<ApplicationState>({
    authState: authReducer,
    imageFactoryListState: imageFactoryListRext.reducers,
    imageFactoryManageState: imageFactoryManageRext.reducers,
    imageFactoryBulkState: imageFactoryBulkUploadRext.reducers,
    imageTrainingListState: imageTrainingListRext.reducers,
    userListState: userListRext.reducers,
    manageUserState: manageUserRext.reducers,

    getTemplatesListState: templateListRext.reducers,
    getTempTypeListState: templateTypeListRext.reducers,
    getSlidesListState: slidesListRext.reducers,
    getTemplateFormState: templateFormRext.reducers,
    getLayoutsListState: layoutListRext.reducers,
    getSlideFormState: slidesFormRext.reducers,
    getTempTypeFormState: templateTypeFormRext.reducers,

    modalState: modalState,
    getTocForPrompt: generateTocRext.reducers,
    getPptForPrompt: generatePptRext.reducers,
    getUserListState: userListRext.reducers,
    getLayoutFormState: layoutFormRext.reducers,

    pngSvgReportState: pngSvgRext.reducers,
    listTrainingQueueState: listTrainingQueueRext.reducers,
    trainedIdState: trainedIdRext.reducers,
    logsState: logsRext.reducers,
  });

export default rootReducer;
