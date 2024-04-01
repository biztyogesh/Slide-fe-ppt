

import CustomButton from "components/CustomButton";
import React, { useRef, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { getBaseUrl } from "store/selectors";
import { URLRoutes } from "URLRoutes";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const drop = useRef<HTMLInputElement | null>(null);
  const baseUrl = useSelector(getBaseUrl)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (drop.current) {
      drop.current.classList.add("dragging");
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (drop.current) {
      drop.current.classList.remove("dragging");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (drop.current) {
      drop.current.classList.remove("dragging");
    }

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please first select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

   
    try {
      const response = await fetch(`${baseUrl}/${URLRoutes.server.fileUpload}`, {
        method: "POST",
        body: formData,
     
        headers: {
          // Include other necessary headers if required
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    
      });

      if (response.ok) {
        alert("File upload is successful");
      } else {
        alert("Failed to upload the file due to errors");
      }
    } catch (error) {
      console.error("Error while uploading the file:", error);
    }
  };

  return (
    <div className="padding-4 height-75">
      <div
        ref={drop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        draggable
        className="flex flex-column flex-align-center flex-justify-center padding-8 margin-t-3 height-100 dragDrop-container"
      >
        {!file && (
          <>
            <input ref={fileInputRef} type="file" onChange={handleOnChange} hidden />
            <div onClick={uploadButtonClick}> Click here to Browse file </div>
            <div className="text-5 text-bold">OR</div>
            <div>Drag and Drop file</div>
          </>
        )}

        {file && (
          <>
            <div>{file && <span>{file.name}</span>}</div>
            <div className="margin-t-7">
              <CustomButton buttonText="Submit" gradientButton handleClick={handleUpload} baseclassname={"padding-2 cursor-pointer"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
