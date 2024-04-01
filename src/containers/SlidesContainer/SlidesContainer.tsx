import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlides,
  requestSlideDetail,
  requestSlidesList,
  requestTemplateDetail,
  updateSlides,
} from "store/rext/action";
import {
  getBaseUrl,
  getSlideFormData,
  getSlidesListData,
  getTemplateFormData,
  getToken,
} from "store/selectors";
import { URLRoutes } from "URLRoutes";
import CustomButton, {
  ICON_POSITION,
} from "components/CustomButton/CustomButton";
import { CUSTOM_SVG_ICON, SVGType } from "components/SvgIcon";
import SlideForm from "./SlideForm";
import Loading from "components/Loading";
import SlideDownload from "components/Download/SlideDownload";

import "./style.scss";
import { modalOperation } from "store/actions";
import { ModalsType } from "containers/ModalManager/ModalManager";
import { toast } from "react-toastify";
import { fetchRequest, getFullUrl } from "Api";

interface ISlides {
  _id: string;
  name: string;
}

function SlidesContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templateTypeId, templateId, slideLayoutId } = useParams();
  const { data: templateDetail } = useSelector(getTemplateFormData);
  const { data: slidesListData, fetching: slidelistFetching } =
    useSelector(getSlidesListData);
  const {
    data: slideData,
    fetching: slideFetching,
    error,
  } = useSelector(getSlideFormData);
  const [activeSlide, setActiveSlide] = useState<any>(null);
  const slideFormRef: MutableRefObject<any> = useRef(null);

  const baseUrl = useSelector(getBaseUrl);
  const token = useSelector(getToken);

  const renderSlides = ({ _id, name }: ISlides, index: number) => {
    const isSlideActive = _id === activeSlide;
    return (
      <div
        key={index}
        className={`flex flex-row  flex-align-center flex-justify-center background-primary-color text-3 slides-container active ${
          isSlideActive ? "active-slide" : ""
        }`}
      >
        {name}
        <SlideDownload
          url={`/ppt/v1/${_id}/download`}
          urlParams={{ slideId: _id }}
          fileName={name}
          setActiveSlide={setActiveSlide}
        />

        <CustomButton
          primaryButton
          type="button"
          handleClick={(e: any) => handleEditClick(_id)}
          iconPosition={ICON_POSITION.RIGHT}
          iconProps={{
            name: CUSTOM_SVG_ICON.Edit,
            svgType: SVGType.CUSTOM,
            size: "small",
            baseclassname: "text-primary-color",
          }}
          transparent
          noOutline
          baseclassname={"cursor-pointer"}
        />
        <CustomButton
          primaryButton
          type="button"
          iconPosition={ICON_POSITION.RIGHT}
          iconProps={{
            name: CUSTOM_SVG_ICON.Delete,
            svgType: SVGType.CUSTOM,
            size: "small",
            baseclassname: "text-danger-color",
          }}
          transparent
          noOutline
          baseclassname={"cursor-pointer"}
        />
      </div>
    );
  };

  const handleAddSlidesClick = () => {
    setActiveSlide(null);
    navigate(
      `/pptFactory/${templateTypeId}/${templateId}/layout/${slideLayoutId}/slide/create`
    ); //doubt
  };

  const handleBackClick = () => {
    // navigate("/")
    navigate(`/pptFactory/template/${templateTypeId}/${templateId}`);
  };

  const handleCloneSlide = () => {
    dispatch(
      modalOperation.showModal(ModalsType.CloneSlideModal, {
        onSave: async (data: any) => {
          dispatch(modalOperation.hideModal());
          try {
            const response = await fetchRequest(
              getFullUrl(baseUrl, "/ppt-generator/slide/v1/clone/:slideId", {
                urlParams: { slideId: activeSlide },
              }),
              token,
              "post",
              data
            );
          } catch (error: any) {
            toast.error(error.message);
          }
        },
        onClose: () => {
          dispatch(modalOperation.hideModal());
        },
        title: "Clone Slide",
      })
    );
  };

  const handleEditClick = (slideId: any) => {
    setActiveSlide((prevActiveSlide: any) => {
      navigate(
        `/pptFactory/${templateTypeId}/${templateId}/layout/${slideLayoutId}/slide/edit/${slideId}`
      );
      if (slideFormRef.current) {
        slideFormRef.current.scrollToTop();
      }
      return slideId;
    });
  };

  useEffect(() => {
    if (slidesListData.length > 0) {
      const firstSlideId = slidesListData[0]._id;
      setActiveSlide(firstSlideId);
      navigate(
        `/pptFactory/${templateTypeId}/${templateId}/layout/${slideLayoutId}/slide/edit/${firstSlideId}`
      );
    }
  }, [slidesListData]);

  useEffect(() => {
    if (templateId && slideLayoutId) {
      dispatch(requestSlidesList({ templateId, slideLayoutId }));
      dispatch(requestTemplateDetail({ templateId }));
    }
  }, [dispatch, templateId, slideLayoutId]);

  useEffect(() => {
    if (activeSlide) {
      dispatch(requestSlideDetail({ slideId: activeSlide }));
    }
  }, [dispatch, activeSlide]);

  const handleSlideFormData = (data: any) => {
    console.log(data, "slide form data");
    const transformedData = {
      slideLayoutId: slideLayoutId,
      templateId: templateId,
      postfix: data.postfix,
      rules: data.rules,
      name: data.name,
      layers: data?.layers?.map((layer: any) => ({
        chatMeta: JSON.stringify(layer.chatMeta),
        metaType: layer.metaType,
        optionsMeta: JSON.stringify(layer.optionsMeta),
      })),
    };

    if (activeSlide) {
      dispatch(updateSlides(transformedData, { slideId: activeSlide }));
    } else {
      dispatch(createSlides(transformedData));
    }
  };

  return (
    <div className="flex flex-row  width-100 height-100">
      {slidelistFetching && <Loading isGlobal />}
      {!slidelistFetching && (
        <Fragment>
          <div className="width-15 flex flex-column flex-align-center margin-1 padding-t-2 overflow-auto slide-left-container">
            {slidesListData.map(renderSlides)}
          </div>
          <div className="flex flex-column margin-t-1 margin-b-1 margin-r-1 slide-right-container">
            <div className="flex  flex-align-center flex-justify-between height-9  margin-b-1 slide-right-container-top">
              <div className="text-6 text-bold padding-t-2 padding-l-2 width-75">
                Template - {templateDetail.name}
              </div>
              <CustomButton
                primaryButton
                type="button"
                buttonText="Back"
                handleClick={handleBackClick}
                gradientButton
                baseclassname={"padding-2 cursor-pointer"}
              />
              <CustomButton
                buttonText="Add More Slides"
                gradientButton
                handleClick={handleAddSlidesClick}
                baseclassname={"width-15 padding-2 margin-l-2 cursor-pointer"}
              />
                <CustomButton
                primaryButton
                type="button"
                buttonText="yogesh"
                handleClick={handleBackClick}
                gradientButton
                baseclassname={"padding-2 cursor-pointer"}
              />
              <CustomButton
                buttonText="Clone"
                handleClick={handleCloneSlide}
                gradientButton
                baseclassname={"padding-2 margin-l-2 cursor-pointer"}
              />
            </div>
            <div className="">
              {slideFetching && <Loading isGlobal />}
              {!slideFetching && (
                <SlideForm
                  ref={slideFormRef}
                  activeSlide={activeSlide}
                  getdata={handleSlideFormData}
                  initialData={slideData}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default SlidesContainer;
