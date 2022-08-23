import { useEffect, useState, useRef } from "react";

const Check = () => {
  const uploadedImage = useRef();
  const imageUploader = useRef();
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
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
      <button type="button" onClick={(e) => console.log(uploadedImage.current)}>
        bbb
      </button>
    </>
  );
};

export default Check;
