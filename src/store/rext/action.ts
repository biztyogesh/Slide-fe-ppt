import { URLRoutes } from "URLRoutes";
import {  generatePptRext, generateTocRext, imageFactoryBulkUploadRext, 
  imageFactoryListRext, imageFactoryManageRext, imageTrainingListRext,
  layoutFormRext, layoutListRext, manageUserRext, pngSvgRext, slidesFormRext, slidesListRext,
   templateFormRext, templateListRext, 
  templateTypeFormRext, templateTypeListRext, listTrainingQueueRext , trainedIdRext , userListRext, logsRext } from "./rext";

// Image Factory
export function requestImageFactoryList(body: any) {
  return imageFactoryListRext.request({
    method: 'post',
    url: URLRoutes.server.imageFactoryList,
    body,
  });
}

export function requestImageFactoryManage(body: any) {
  return imageFactoryManageRext.request({
    method: 'post',
    url: URLRoutes.server.imageFactoryManage,
    body,
  });
}

export function requestImageFactoryBulkUpload(body: any) {
  return imageFactoryBulkUploadRext.request({
    method: 'post',
    url: URLRoutes.server.imageFactoryBulk,
    body,
  });
}

// ----------------


// Image Training

export function requestImageTrainingList(prompt: string) {
  return imageTrainingListRext.request({
    method: 'post',
    url: URLRoutes.server.imageTrainingSearch,
    body: {
      "title": prompt,
      "content": "",
      "top_k": 20,
      "enable_gpt": "true",
      "query_type": "semantic"
    },
  });
}
// --------------------------



// Manage Users Actions

export function requestUserList(body: any) {
  return userListRext.request({
    method: 'post',
    url: URLRoutes.server.listUser,
    body
  });
}

export function requestManageUser(body: any) {
  return manageUserRext.request({
    method: 'post',
    url: URLRoutes.server.createUser,
    body
  });
}

// --------------------
export function getTocForPrompt(body:any) {
  return generateTocRext.request({
    method: 'post',
    url: URLRoutes.server.generateTOC,
    body,
  });
}

export function getPPTForPrompt(body:any , urlParams: any) {
  return generatePptRext.request({
    method: 'post',
    url: URLRoutes.server.generatePPT,
    body,
    urlParams
  });
}



//Template Type Actions
export function requestTemplateTypeList(body:any) {
  return templateTypeListRext.request({
    method: 'post',
    url: URLRoutes.server.listTemplateType,
    body
  });
}

export function requestTemplateTypeDetail(urlParams:any) {
  return templateTypeFormRext.request({
    method: 'get',
    url: URLRoutes.server.detailTemplateType,
    urlParams: urlParams
  });
}

export function createTemplateType(body: any) {
  return templateTypeFormRext.request({
    method: "post",
    url: URLRoutes.server.createTemplateType,
    body,
  })
}

export function updateTemplateType(urlParams: any, body: any) {
  return templateTypeFormRext.update({
    method: "put",
    url: URLRoutes.server.updateTemplateType,
    urlParams: urlParams,
    body,
  })
}

//Template Actions
export function requestTemplatesList(body:any) {
  return templateListRext.request({
    method: 'post',
    url: URLRoutes.server.listTemplates,
    body
  });
}

export function createTemplates(body: any) {
  return templateFormRext.request({
    method: "post",
    url: URLRoutes.server.createTemplate,
    body,
  })
}
export function requestTemplateDetail(urlParams: any) {
  return templateFormRext.request({
    method: "get",
    url: URLRoutes.server.detailTemplate,
    urlParams,
  })
}


export function updateTemplate(urlParams: any, body: any) {
  return templateFormRext.update({
    method: "put",
    url: URLRoutes.server.updateTemplate,
    urlParams: urlParams,
    body,
  })
}

export function deleteTemplate(urlParams: any) {
  return templateListRext.request({
    method: "delete",
    url: URLRoutes.server.deleteTemplate,
    urlParams
  })
}

//Slide Layout Actions
export function requestLayoutsList(body: any) {
  return layoutListRext.request({
    method: 'post',
    url: URLRoutes.server.listLayouts,
    body
  });
}

export function createLayout(body: any) {
  return layoutFormRext.request({
    method: "post",
    url: URLRoutes.server.createLayout,
    body,
  })
}

export function updateLayouts(urlParams: any , body: any) {
  return layoutFormRext.update({
    method: "put",
    url: URLRoutes.server.updateLayout,
    body,
    urlParams: urlParams
  })
}

export function requestLayoutDetail(urlParams: any) {
  return layoutFormRext.request({
    method: "get",
    url: URLRoutes.server.detailLayout,
    urlParams
  })
}


//Slides Actions
export function requestSlidesList(body: any) {
  return slidesListRext.request({
    method: 'post',
    url: URLRoutes.server.getSlidesList,
    body,
  });
}

export function createSlides(body: any) {
  return slidesFormRext.request({
    method: "post",
    url: URLRoutes.server.createSlide,
    body, 
  })
}

export function updateSlides(body: any, urlParams:any) {
  return slidesFormRext.update({
    method: "put",
    url: URLRoutes.server.updateSlide,
    body,
    urlParams: urlParams
  })
}

export function requestSlideDetail(urlParams: any) {
  return slidesFormRext.request({
    method: "get",
    url: URLRoutes.server.slideDetail,
    urlParams: urlParams,
  })
}

export function requestPngSvgAnalytics(body: any) {
  return pngSvgRext.request({
    method: 'post',
    url: URLRoutes.server.pngSvgReports,
    body
  });
}

export function requestTrainingList(body: any) {
  return listTrainingQueueRext.request({
    method: 'post',
    url: URLRoutes.server.trainingList,
    body
  });
}

export function requestStartTraining(body: any , urlParams:any) {
  return trainedIdRext.request({
    method: 'post',
    url: URLRoutes.server.startTraining,
    body,
    urlParams: urlParams
  });
}

export function requestListLogs(body: any) {
  return logsRext.request({
    method: 'post',
    url: URLRoutes.server.logs,
    body,
  });
}