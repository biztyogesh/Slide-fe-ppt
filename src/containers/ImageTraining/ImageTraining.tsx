import React, { useCallback, useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "components/CustomButton";
import { fetchRequest } from "Api";
import { getBaseUrl, getImageTrainingList, getToken } from "store/selectors";

import { SVGType } from "components/SvgIcon";
import { ICON_POSITION } from "components/CustomButton/CustomButton";
import { requestImageTrainingList } from "store/rext";
import Loading from "components/Loading";

import "./style.scss"


export function useImageThumbnail(imageId: string) {
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<any>({});
  const baseUrl = useSelector(getBaseUrl);
  const token = useSelector(getToken);

  const fetchImageDetail = useCallback(async () => {
    try {
      const response = await fetchRequest(`${baseUrl}/image-upload/v1/${imageId}`, token, "get");
      setImageInfo(response.data);
    } catch (error) {
      setImageInfo({ error: true });
    }
  }, [imageId]);

  useEffect(() => {
    if (imageId && !downloadStarted) {
      setDownloadStarted(true);
      fetchImageDetail();
    }
  }, [imageId]);

  return imageInfo;
}


function ImageThumbnail({ imageData }: any) {
  const { imageid } = imageData;
  const data = useImageThumbnail(imageid);
  return (
    <div className="flex flex-column width-25 padding-4">
      {data?.signedUrl && <img src={data?.signedUrl} className="width-100" />}
      <div>{data.title}</div>
    </div>
  )
}

export default function ImageTraining() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: imageTrainingData, fetching } = useSelector(getImageTrainingList);

  const [prompt, setPrompt] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleClick = () => {
    dispatch(requestImageTrainingList(prompt))
  };

  const renderImageCard = (imageData: any, index: number) => {
    return (<ImageThumbnail imageData={imageData} key={imageData.imageid} />)
  }

  return (
    <div className="flex flex-column">
      <div className="flex flex-justify-start">
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
      <div className="flex flex-align-center flex-justify-center">
        <Input type="text" placeholder={"Enter Prompt"} value={prompt} onChange={handleInputChange} className="width-40 margin-t-8" />
        <div className="margin-t-8 margin-l-2">
          <CustomButton buttonText={"Search"} handleClick={handleClick} gradientButton baseclassname={"cursor-pointer"} disabled={!prompt.length} round />
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {
          imageTrainingData?.results?.map(renderImageCard)
        }
      </div>
      {fetching && <Loading isGlobal/>}
    </div>
  );
}
