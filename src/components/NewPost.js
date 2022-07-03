import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import "./assets/styles/base.css";
import { useEffect } from "react";
import { Transition } from "react-transition-group";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const NewPost = (props) => {
  // ユーザーからの画像を取得
  const [imageData, setImageData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(100);
  const [imageName, setImageName] = useState("");
  // const [open, setOpen] = useState("");
  const navigate = useNavigate();

  const onFileChange = async (img) => {
    const image = img.target.files[0];
    console.log(img.target.files[0]);
    setImageData(image);

    console.log("アップロード処理");
    const metadata = {
      contentType: "image/jpeg",
    };

    // 画像の数を数えて、それを画像の名前の中央へ
    const imgsCollectionRef = collection(db, "imgs");
    const imgsSnapshot = await getDocs(imgsCollectionRef);
    const imgsSum = imgsSnapshot.docs.length;
    const num = () => Math.floor(Math.random() * 10000000000);
    const imageNameSnapshot = num() + "_" + imgsSum + "_" + num();
    setImageName(imageNameSnapshot);

    // imgCountを受け取って+1して返す
    const storageRef = ref(storage, "images/" + imageNameSnapshot);
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
    );
  };

  useEffect(() => {
    if (imageUrl) {
      navigate("/hApp-test/createArticle", {
        state: { imageUrl: imageUrl, imageName: imageName },
      });
    }
  }, [imageUrl, props.newPostOpen]);

  const moveNewPost = () => {
    props.setNewPostOpen(false);
  };

  return (
    <>
      {/* <Transition
      in={props.newPostOpen}
      timeout={550}> */}
      <div className={props.newPostOpen ? "newPostContainer " : "close"}>
        <ul>
          <li>
            <label>
              画像アップロード
              <input
                type="file"
                name="selectImg"
                accept="image/*"
                className="newInputFile"
                onChange={(img) => {
                  onFileChange(img);
                }}
              />
            </label>
          </li>
          <li>フォルダ新規作成</li>
          <li>
            <button className="newPostButton" onClick={moveNewPost}>
              <ArrowBackIosNewIcon
                className="backButton"
                sx={{
                  color: "#333333",
                  fontSize: 20,
                  transform: "rotate(90deg)",
                }}
              />
            </button>
          </li>
        </ul>
      </div>

      {/* </Transition> */}
    </>
  );
};

export default NewPost;
