import { createRext, IRext } from 'store/baseProvider/rext';
import { getBaseUrl, getToken } from 'store/selectors';


// Image Factory 
export const imageFactoryListRext: IRext = createRext ({
  identity: 'imageFactoryListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

export const imageFactoryBulkUploadRext: IRext = createRext ({
  identity: 'imageFactoryBulkUploadRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

export const imageFactoryManageRext: IRext = createRext ({
  identity: 'imageFactoryManageRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

//----------------------------------

// Image Factory 

export const imageTrainingListRext: IRext = createRext ({
  identity: 'imageTrainingListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

//----------------------------


//User Management
export const userListRext: IRext = createRext({
  identity: 'userListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
});

export const manageUserRext : IRext = createRext({
  identity: 'manageUserRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

// ---------------------------

export const generateTocRext : IRext = createRext ({
  identity: 'generateTocRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

export const generatePptRext : IRext = createRext ({
  identity: 'generatePptRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})



//Templates
export const templateListRext: IRext = createRext({
  identity: 'templateListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
 });

 export const templateFormRext: IRext = createRext({
   identity: 'templateFormRext',
   getBaseUrl: getBaseUrl,
   getToken: getToken,
 });
 export const templateTypeListRext: IRext = createRext({
  identity: 'templateTypeListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
 });
 export const templateTypeFormRext: IRext = createRext({
  identity: 'templateTypeFormRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
 });



// Slide Layouts
export const layoutListRext: IRext = createRext({
  identity: 'layoutListRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
});

export const layoutFormRext: IRext = createRext({
  identity: 'layoutFormRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
});

//Slides
export const slidesListRext: IRext = createRext({
  identity: "slidesListRext",
  getBaseUrl: getBaseUrl,
  getToken: getToken,

})

export const slidesFormRext: IRext = createRext({
  identity: "slidesFormRext",
  getBaseUrl: getBaseUrl,
  getToken: getToken,
  transformation: (slideData: any ) => {
    return {
      name: slideData.name,
      postfix: slideData.postfix,
      rules: slideData.rules,
      layers: slideData?.layers?.map((layer: any) => ({
        chatMeta: JSON.parse(layer.chatMeta),
        metaType: layer.metaType,
        optionsMeta: JSON.parse(layer.optionsMeta),
      })),
    }
  }
})

export const pngSvgRext : IRext = createRext({
  identity: 'pngSvgRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

export const listTrainingQueueRext : IRext = createRext({
  identity: 'listTrainingQueueRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})

export const trainedIdRext : IRext = createRext({
  identity: 'trainedIdRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})


export const logsRext : IRext = createRext({
  identity: 'logsRext',
  getBaseUrl: getBaseUrl,
  getToken: getToken,
})
