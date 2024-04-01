export interface IBaseFeature {
    isAllowed: boolean;
}

export interface IMyTemplateFeature extends IBaseFeature {
    add: boolean;
    edit: boolean;
    delete: boolean;
    detail: boolean;
}

export interface IMySlideFeature extends IBaseFeature {
    add: boolean;
    edit: boolean;
    delete: boolean;
    detail: boolean;
}
