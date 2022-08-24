import { useEffect, useState, useRef } from "react";
import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Check = () => {
  const handleOnIdle = () => {
    console.log("The user has been logged out...");
  };
  useIdleTimer({
    timeout: 5 * 1000,
    // onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  const uploadedImage = useRef();
  const imageUploader = useRef();
  const handleImageUpload = (e) => {
    console.log("e.target.files", e.target.files);
    const [file] = e.target.files;
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        console.log("e.target.result", e.target.result);

        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        <input
          ref={imageUploader}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple="false"
        />
        <div
          style={{
            height: "60px",
            width: "60px",
            border: "1px dashed black",
          }}
        >
          <img
            ref={uploadedImage}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          console.log("toastify");
          toast("You have been logged out.");
          console.log(uploadedImage.current);
        }}
      >
        bbb
      </button>
    </>
  );
};

export default Check;
