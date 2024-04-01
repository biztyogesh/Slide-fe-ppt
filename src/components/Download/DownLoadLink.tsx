import React, { useState, Fragment, MutableRefObject, useRef } from "react";
import CustomButton from "components/CustomButton/CustomButton";
import { fetchRequest, getFullUrl } from "Api";
import { getBaseUrl, getToken } from "store/selectors";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export interface DownloadLinkProps {
  urlParams?: any;
  queryParams?: any;
  fileName: string;
  url: string;
  body: any;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({
  urlParams,
  fileName,
  url,
  body,
}) => {
  const downloadRef: MutableRefObject<HTMLAnchorElement> = useRef(null!);

  const [fetching, setFetching] = useState<boolean>(false);
  const token = useSelector(getToken);
  const baseUrl = useSelector(getBaseUrl);
  const headers = new Headers();
  headers.append("Authorization", `${token}`);
  const handleDownload = async () => {
    if (!fetching) {
      try {
        setFetching(true);

        const response = await fetchRequest(
          getFullUrl(baseUrl, url, { urlParams }),
          token,
          "post",
          body,
          headers
        );
        const blob = await response.blob();
        const urlLink = URL.createObjectURL(blob);

        if (downloadRef.current) {
          downloadRef.current.href = urlLink;
          downloadRef.current.download = `${fileName}.csv`;
          downloadRef.current.click();
        }

        setFetching(false);
      } catch (error: any) {
        setFetching(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <Fragment>
      <a ref={downloadRef} className="display-none" />

      <CustomButton
        gradientButton
        type="button"
        handleClick={handleDownload}
        buttonText="Download"
        loading={fetching}
        baseclassname={"cursor-pointer margin-r-4"}
        disabled={!fileName}
      />
    </Fragment>
  );
};

export default DownloadLink;
