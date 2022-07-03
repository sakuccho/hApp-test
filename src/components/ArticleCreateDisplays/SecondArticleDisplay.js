import React, { useCallback, useRef, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import styled from "styled-components";
import "./assets/styles/tagInput.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { EditField } from "..";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";

const SecondArticleDisplay = (props) => {
  const TagContainer = styled.div`
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authObject = getAuth();
    const user = authObject.currentUser;
    const { articleBody } = event.target.elements;
    if (user !== null) {
      // 投稿をデータベースに保存
      const usersCollectionRef = collection(db, "corrections");
      const documentRef = await addDoc(usersCollectionRef, {
        user_id: user.uid,
        body: articleBody.value,
        image_path: props.imageUrl,
        image_name: props.imageName,
      });

      // タグと記事を結びつける
      tagsId.forEach(async (tag) => {
        const tagsCollectionRef = collection(db, "attachedTag");
        // eslint-disable-next-line no-unused-vars
        const tagsDocumentRef = await addDoc(tagsCollectionRef, {
          article_id: documentRef.id,
          tag_id: tag,
        });
      });

      const imgsCollectionRef = collection(db, "imgs");
      // eslint-disable-next-line no-unused-vars
      const imgsDocumentRef = await addDoc(imgsCollectionRef, {
        image_path: props.imageUrl,
        method_id: documentRef.id,
        method: "article",
      });

      navigate(0);
    }
  };

  const [tagsId, setTagsId] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const reactTags = useRef();

  const onDelete = useCallback(
    async (tagIndex) => {
      console.log(tagIndex);
      const newTags = tags.filter((tag, index) => index !== tagIndex);
      setTags(newTags);

      const tagsCorrectionRef = collection(db, "tags");
      const q = query(
        tagsCorrectionRef,
        where("tag_name", "==", tags[tagIndex].name)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach(async (document) => {
        console.log(document.id);
        setTagsId(tagsId.filter((n) => n !== document.id));
      });
    },
    [tags, tagsId]
  );

  const onAddition = useCallback(
    async (newTag) => {
      const newTags = [].concat(tags, newTag);
      setTags(newTags);

      const tagsCorrectionRef = collection(db, "tags");
      const q = query(tagsCorrectionRef, where("tag_name", "==", newTag.name));
      const querySnapshot = await getDocs(q);
      // データベースのtagを確認、なかったら追加。
      if (!querySnapshot.docs.length) {
        // eslint-disable-next-line no-unused-vars
        const documentRef = await addDoc(tagsCorrectionRef, {
          tag_name: newTag.name,
        });
        setTagsId([...tagsId, documentRef.id]);
      } else {
        console.log("そのtagはもうあるよ");
        setTagsId([...tagsId, querySnapshot.docs[0].id]);
      }
    },
    [tags, tagsId]
  );

  if (props.imageUrl) {
    return (
      <div className="tag_container">
        <div>
          <EditField imageUrl={props.imageUrl} />
        </div>
        <form onSubmit={handleSubmit}>
          <TagContainer>
            <ReactTags
              ref={reactTags}
              tags={tags}
              onAddition={onAddition}
              onDelete={onDelete}
              allowNew
            />
          </TagContainer>
          <div>
            <textarea
              name="articleBody"
              type="text"
              placeholder="テキストを入力してください"
            ></textarea>
            <input type="submit" value="新規投稿"></input>
          </div>
        </form>
      </div>
    );
  }else {
    navigate("/hApp-test");
  }
};

export default SecondArticleDisplay;
