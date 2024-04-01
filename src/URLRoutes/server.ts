export const server = {

    // imageFactory
    imageFactoryBulk: "/image-upload/v1/bulk",
    imageFactoryList: "/image-upload/v1/list",
    imageFactoryManage: "/image-upload/v1/create",

    // imageTraining
    imageTrainingSearch: "/image-model/get-images",

    pngSvgReports: "/png-svg/v1/analytics",
    trainingList:"/image-upload/training/v1/list",
    startTraining: "/image-upload/training/v1/execute/:trainingId",
    
    //user 
    login: "/user/v1/login",
    currentuser: "/user/v1/currentuser",
    createUser: "/user/v1/create",
    listUser: "/user/v1/list",
    logs:"/user/logs/v1/list",
    
    //Template
    listTemplates: "/ppt-generator/template/v1/list",
    createTemplate: "/ppt-generator/template/v1/create",
    detailTemplate: "/ppt-generator/template/v1/:templateId",
    updateTemplate: "/ppt-generator/template/v1/:templateId",
    deleteTemplate: "/api/template/delete",
    //TemplateType
    listTemplateType: "/ppt-generator/template-type/v1/list",
    createTemplateType: "/ppt-generator/template-type/v1/create",
    updateTemplateType: "/ppt-generator/template-type/v1/:id",
    detailTemplateType: "/ppt-generator/template-type/v1/:id",
    //Slide Layouts
    listLayouts: "/ppt-generator/slide-layout/v1/list",
    createLayout: "/ppt-generator/slide-layout/v1/create",
    updateLayout: "/ppt-generator/slide-layout/v1/:slideLayoutId",
    detailLayout: "/ppt-generator/slide-layout/v1/:slideLayoutId",
    //Slides
    getSlidesList: "/ppt-generator/slide/v1/list",
    createSlide: "/ppt-generator/slide/v1/create",
    updateSlide: "/ppt-generator/slide/v1/:slideId",
    slideDetail: "/ppt-generator/slide/v1/:slideId",
    downloadSlide: "/ppt/v1/:slideId/download",
    //Images
    getImagesList: "/data/user.json",
    fileUpload: "/image-upload/v1/bulk",
    createImage: "/api/image/v1/create",
    //PPT
    generateTOC: "/api/ppt/v1/execute",
    generatePPT: "/api/ppt/v1/generate/:execution_id",
    getImage: "/api/image/v1",
    sendData: "/api"
}