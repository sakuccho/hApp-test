import React, { useCallback, useRef, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import styled from "styled-components";
import "./assets/styles/tagInput.css";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";

const SecondArticleDisplay = (props) => {
  const Preview = styled.img`
    width: 100%;
  `;

  const PreviewCover = styled.div`
    width: 50%;
    height: 300px;
  `;

  const AllContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  const ArticleBody = styled.textarea`
    width: 100%;
    height: 300px;
    color: gray;
  `;

  const Form = styled.form`
    width: 50%;
    height: 100%;
  `;

  const navigate = useNavigate();
  // tagについて
  const suggestions = [{ id: "1", name: "USA" }];
  const [tags, setTags] = useState([]);
  const [tagsId, setTagsId] = useState([]);

  const reactTags = useRef();

  const onDelete = useCallback(
    async (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));

      const tagsCorrectionRef = collection(db, "tags");
      const q = query(
        tagsCorrectionRef,
        where("tag_name", "==", tags[tagIndex].name)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach(async (document) => {
        setTagsId(tagsId.filter((n) => n !== document.id));
      });
    },
    [tags, tagsId]
  );

  const onAddition = useCallback(
    async (newTag) => {
      setTags([...tags, newTag]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tags, tagsId]
    // tagをdbに追加
  );

  console.log(tagsId);

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
        tagsId,
      });
      console.log(documentRef);
      navigate(0);
    }
  };

  return (
    <AllContainer>
      <PreviewCover>
        <Preview src={props.imageUrl} alt="uploaded" />
      </PreviewCover>
      <Form onSubmit={handleSubmit}>
        <ReactTags
          ref={reactTags}
          tags={tags}
          suggestions={suggestions}
          onAddition={onAddition}
          onDelete={onDelete}
          allowNew
        />
        <ArticleBody
          name="articleBody"
          type="text"
          placeholder="テキストを入力してください"
        ></ArticleBody>
        <input type="submit" value="新規投稿"></input>
      </Form>
    </AllContainer>
  );
};

export default SecondArticleDisplay;
