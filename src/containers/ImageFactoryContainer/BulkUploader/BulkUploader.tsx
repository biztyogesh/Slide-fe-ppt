import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FileUploaderComponent from "components/FileUploaderComponent/FileUploaderNew";
import CustomButton from "components/CustomButton";
import { SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import { requestImageFactoryBulkUpload } from "store/rext";
import UsePrevious from "containers/HOC/UsePrevious";
import { getImageFactoryBulkUploadState } from "store/selectors";

import "./style.scss";
import Loading from "components/Loading";


export default function BulkFileUploader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetching, error } = useSelector(getImageFactoryBulkUploadState);
  const wasfecthing = UsePrevious(fetching);

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(requestImageFactoryBulkUpload(formData));
  };

  useEffect(() => {
    if (wasfecthing && !fetching && !error) {
      toast.info("Bulk Upload done");
    }
  }, [wasfecthing, fetching])

  return (
    <Fragment>
      <CustomButton
        primaryButton
        type="button"
        handleClick={() => navigate(-1)}
        iconProps={{
          name: "arrow left",
          svgType: SVGType.SEMANTIC,
          size: "large",
          baseclassname: "text-default-color",
        }}
        iconPosition={ICON_POSITION.RIGHT}
        transparent
        noOutline
        baseclassname={"cursor-pointer"}
      />
      <div className="height-90 flex flex-justify-center flex-align-center">
        <div className="flex flex-column width-50 height-50 background-white-shade-1 fileUploader-container">
          <div className="text-7 text-bold padding-4">Upload Supporting File</div>
          <FileUploaderComponent handleUpload={handleUpload} />
        </div>
      </div>
      {
        fetching && <Loading isGlobal/>
      }
    </Fragment>
  );
}
