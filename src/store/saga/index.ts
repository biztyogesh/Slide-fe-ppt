import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
  generatePptRext, generateTocRext, slidesFormRext, slidesListRext, templateFormRext,
  templateListRext, userListRext, layoutListRext,
  templateTypeListRext, templateTypeFormRext, layoutFormRext,
  imageFactoryBulkUploadRext, imageFactoryListRext, imageFactoryManageRext, imageTrainingListRext, manageUserRext, pngSvgRext, listTrainingQueueRext, trainedIdRext, logsRext
} from 'store/rext';
import { watchAuthEvent } from './auth';

export default function* root(): SagaIterator {
  yield all([
    fork(imageFactoryBulkUploadRext.saga),
    fork(imageFactoryListRext.saga),
    fork(imageFactoryManageRext.saga),
    fork(imageTrainingListRext.saga),
    fork(manageUserRext.saga),
    fork(userListRext.saga),

    fork(templateListRext.saga),
    fork(slidesListRext.saga),
    fork(templateTypeListRext.saga),
    fork(templateFormRext.saga),
    fork(templateTypeFormRext.saga),
    fork(slidesFormRext.saga),
    fork(generateTocRext.saga),
    fork(generatePptRext.saga),
    fork(layoutListRext.saga),
    fork(layoutFormRext.saga),

    fork(pngSvgRext.saga),
    fork(listTrainingQueueRext.saga),
    fork(trainedIdRext.saga),
    fork(logsRext.saga),

    fork(watchAuthEvent)
  ]);
}