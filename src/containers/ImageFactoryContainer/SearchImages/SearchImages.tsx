import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "components/CustomButton";
import { HookFormInput } from "components/FormInputs";
import { SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import Loading from "components/Loading";


import { getImageFactoryListState } from "store/selectors";
import { requestImageFactoryList } from "store/rext";

import { URLRoutes } from "URLRoutes";
import "./style.scss";


export default function ImageFactory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: imageList, fetching } = useSelector(getImageFactoryListState);
  const { handleSubmit, formState: { errors }, control } = useForm({});

  const handleOnSubmit = (data: any) => {
    dispatch(requestImageFactoryList(data));
  };

  const handleAddClick = () => {
    navigate(URLRoutes.clients.imageFactoryManage);
  };

  const handleBulkClick = () => {
    navigate(URLRoutes.clients.imageFactoryBulk);
  };

  const renderImage = ({ title, signedUrl }: any, index: number) => {
    return <div className="flex flex-column width-25 padding-4" key={`image_${index}`}>
      <img src={signedUrl} className="width-100" />
      <div>{title}</div>
    </div>
  }

  return (
    <div className="flex flex-column">
      <div className="flex flex-row padding-t-6 width-100">
        <div className="width-10">
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
        </div>
        <div className="flex flex-column width-70 filter-container">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-row">
            <HookFormInput
              control={control}
              errors={errors}
              baseClassName="width-40 margin-l-3"
              label="Filter images through Name"
              id="imageName"
              name="name"
            />
            <div className="padding-5">
              <CustomButton buttonText="Search" type="submit" primaryButton />
            </div>
          </form>
        </div>
        <div className="flex flex-align-center width-20">
          <div className="">
            <CustomButton
              buttonText="BULK"
              gradientButton
              handleClick={handleBulkClick}
              baseclassname={"margin-r-4 cursor-pointer"}
            />
            <CustomButton
              buttonText="ADD"
              gradientButton
              handleClick={handleAddClick}
              baseclassname={"margin-r-4 cursor-pointer"}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap flew-row width-100">
        {
          imageList?.records?.map(renderImage)
        }
      </div>
      {fetching && <Loading isGlobal />}
    </div>
  );
}
