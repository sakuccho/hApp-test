import React from "react";
import { useEnhancer } from "..";

const EditField = (props) => {
  const enhance = useEnhancer();
  console.log(enhance.canv);

  return (
    <div>
      <button
        onClick={() => {
          enhance.downloadImage(enhance.canv, enhance.img, "1");
          enhance.downloadImage(enhance.canv2, enhance.img2, "2");
        }}
        type="button"
      >
        ダウンロード
      </button>
      <canvas ref={enhance.canv} style={{ display: "none" }}>
        <img
          ref={enhance.img}
          src={props.imageUrl}
          alt=""
          crossOrigin="anonymous"
        />
      </canvas>
      <canvas ref={enhance.canv2} style={{ display: "none" }}>
        <img
          ref={enhance.img2}
          src="https://cdn.qiita.com/assets/qiita-fb-2887e7b4aad86fd8c25cea84846f2236.png?cache=none"
          alt=""
          crossOrigin="anonymous"
        />
      </canvas>
    </div>
  );
};

export default EditField;
