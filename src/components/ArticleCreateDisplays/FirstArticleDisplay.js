import React, { useState } from "react";
import styled from "styled-components";
import { SecondArticleDisplay } from "../../components";
import Pen from "../../imgs/4516.png";
import { storage} from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FirstArticleDisplay = () => {
  const InputFile = styled.input`
    display: none;
  `;

  const Img = styled.img`
    width: 35%;
  `;

  const ImgCover = styled.div`
    margin-top: 80px;
  `;

  // ユーザーからの画像を取得
  const [imageData, setImageData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(100);

  const onFileChange = (img) => {
    const image = img.target.files[0];
    setImageData(image);

    console.log("アップロード処理");
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
        setProgress(percent);
        console.log(progress);
      },
      (error) => {
        console.log("err", error);
        setProgress(100); //実行中のバーを消す
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    )
  };

  if (imageData === "") {
    return (
      <>
        <h4>新規添削を作成</h4>
        <div className="ui divider"></div>
        <div>
          <ImgCover>
            <Img src={Pen} alt="" />
            <h4>画像を選ぼうよ</h4>
            <label className="ui button">
              コンピューターから選択
              <InputFile
                type="file"
                name="selectImg"
                accept="image/*"
                onChange={(img) => {
                  onFileChange(img);
                }}
              />
            </label>
          </ImgCover>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SecondArticleDisplay imageUrl={imageUrl}/>
      </>
    );
  }
};

export default FirstArticleDisplay;
