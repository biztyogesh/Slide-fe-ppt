import React, { Fragment, MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getBaseUrl, getToken } from "store/selectors";
import { modalOperation } from "store/actions";
import { fetchRequest, getFullUrl } from "Api";
import { ModalsType } from "containers/ModalManager/ModalManager";
import { SVGType } from "components/SvgIcon";
import CustomButton from "../CustomButton";
import { ICON_POSITION } from "components/CustomButton/CustomButton";

export interface IDownLoadSvg {
  fileName?: any;
  url: string;
  urlParams: any;
  queryParams?: any;
  setActiveSlide?:any;
}

export const SlideDownload: React.FC<IDownLoadSvg> = ({ urlParams, queryParams, url ,fileName , setActiveSlide}) => {
  const downloadRef: MutableRefObject<HTMLAnchorElement> = useRef(null!);
  const token = useSelector(getToken);
  const baseUrl = useSelector(getBaseUrl);
  const [fetching, setFetching] = useState<boolean>(false);
  const dispatch = useDispatch()


  const handleDownloadModal = () => {
    dispatch(
      modalOperation.showModal(ModalsType.SlideDownloadModal, {
        onSave: async(data: any) => {
          setActiveSlide(urlParams.slideId)
          dispatch(modalOperation.hideModal());
              if (!fetching) {
                try {
                  setFetching(true);
                  const response = await fetchRequest(getFullUrl(baseUrl, url, { urlParams, queryParams }), token, "post", data);
                  const blob = await response.blob();
          
                  if (downloadRef.current) {
                    downloadRef.current.href = URL.createObjectURL(blob);
                    downloadRef.current.download = `${fileName}.pptx`;
                    downloadRef.current.click();
                  }
                  setFetching(false);
                } catch (error: any) {
                  setFetching(false);
                  toast.error(error.message);
                }
              }
          
        },
        onClose: () => {
          dispatch(modalOperation.hideModal());
        },
        title: "Slide Download",
      })
    );
  };

//   const handleDownload = async () => {
//     setActiveSlide(urlParams.slideId)
//     if (!fetching) {
//       try {
//         setFetching(true);
//         const response = await fetchRequest(getFullUrl(baseUrl, url, { urlParams, queryParams }), token, "get");
//         const blob = await response.blob();

//         if (downloadRef.current) {
//           downloadRef.current.href = URL.createObjectURL(blob);
//           downloadRef.current.download = `${fileName}.pptx`;
//           downloadRef.current.click();
//         }
//         setFetching(false);
//       } catch (error: any) {
//         setFetching(false);
//         toast.error(error.message);
//       }
//     }
//   };

  return (
    <Fragment>
      <a ref={downloadRef} className="display-none" />
      <CustomButton
        primaryButton
        type="button"
        handleClick={handleDownloadModal}
        iconPosition={ICON_POSITION.RIGHT}
        iconProps={{
          name: "download",
          svgType: SVGType.SEMANTIC,
          size: "small",
          baseclassname: "text-secondary-color",
        }}
        loading={fetching}
        transparent
        noOutline
        baseclassname={"cursor-pointer"}
      />
    </Fragment>
  );
};

export default SlideDownload;
