import { IMyTemplateFeature, IMySlideFeature } from "./interface";
import { FEATURES } from "./constant";

const findFeatures = (srcFeatures: Array<FEATURES>, destinationFeatures: Array<FEATURES>): any => {
    const result: { [key: string]: boolean } = {};
    let isAllowed: boolean = false;
    destinationFeatures.forEach(feature => {
        const isFound = srcFeatures.findIndex(item => item === feature) >= 0;
        result[feature] = isFound;
        if (isFound && !isAllowed) {
            isAllowed = true
        }
    })
    return {
        ...result,
        isAllowed
    }
}


class Feature {
    private _templateFeature: IMyTemplateFeature;
    private _slideFeature: IMySlideFeature;

    constructor(features: Array<FEATURES>) {
        this._templateFeature = this.setMyTemplateFeature(features);
        this._slideFeature = this.setMySlideFeature(features);
    }

    private setMyTemplateFeature = (features: Array<FEATURES>): IMyTemplateFeature => {
        const result = findFeatures(features, [FEATURES.TEMPLATES, FEATURES.TEMPLATE_ADD, FEATURES.TEMPLATE_UPDATE, FEATURES.TEMPLATE_DETAIL, FEATURES.TEMPLATE_DELETE]);
        return {
            isAllowed: result.isAllowed,
            add: result[FEATURES.TEMPLATE_ADD],
            edit: result[FEATURES.TEMPLATE_UPDATE],
            detail: result[FEATURES.TEMPLATE_DETAIL],
            delete: result[FEATURES.TEMPLATE_DELETE]
        }
    }

    private setMySlideFeature = (features: Array<FEATURES>): IMySlideFeature => {
        const result = findFeatures(features, [FEATURES.SLIDES_LIST, FEATURES.SLIDE_ADD, FEATURES.SLIDE_UPDATE, FEATURES.SLIDE_DETAIL, FEATURES.SLIDE_DELETE]);
        return {
            isAllowed: result.isAllowed,
            add: result[FEATURES.SLIDE_ADD],
            edit: result[FEATURES.SLIDE_UPDATE],
            detail: result[FEATURES.SLIDE_DETAIL],
            delete: result[FEATURES.SLIDE_DELETE]
        }
    }

    getMyTemplatesFeature = (): IMyTemplateFeature => {
        return this._templateFeature;
    }

    getMySlidesFeature = (): IMySlideFeature => {
        return this._slideFeature;
    }
}

export { Feature };