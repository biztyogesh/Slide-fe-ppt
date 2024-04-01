export const clients = {
  dashboard: "/app",
  login: "/login",
  signup: "/auth/signup",
  userMangement:"/userMangement/list",
  imageTraining: "/imageTraining" ,
  pptFactory: "/pptFactory/list",
  createTemplateType: "/pptFactory/create",
  editTemplateType: "/pptFactory/edit/:id",
  listTemplates: "/pptFactory/templateTypes/:templateTypeId",
  createTemplate: "/pptFactory/template/create/:templateTypeId",
  editTemplate: "/pptFactory/template/edit/:templateId",
  listLayouts: "/pptFactory/template/:templateTypeId/:templateId",
  createLayout: "/pptFactory/layout/create/:templateTypeId",
  editLayout: "/pptFactory/layout/edit/:slideLayoutId",
  listSlides: "/pptFactory/layout/:templateTypeId/:templateId/:slideLayoutId",
  createSlide: "/pptFactory/:templateTypeId/:templateId/layout/:slideLayoutId/slide/create",
  editSlide: "/pptFactory/:templateTypeId/:templateId/layout/:slideLayoutId/slide/edit/:slideId",
  slideThumbnail:"/generatePPT", 
  notAllowed: "/notAllowed",

  pngSvg: "/reports",
  trainingQueue: "/trainingQueue",
  logs: "/logs",

  // Image Factory Upload
  imageFactorySearch: "/imageFactory/search",
  imageFactoryManage:"/imageFactory/manage" , 
  imageFactoryBulk: "/imageFactory/bulkUpload",
}