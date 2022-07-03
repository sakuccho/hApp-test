import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { DisplayTags, ArticleDelete } from "..";
import "./assets/styles/base.css";

const ArticleItems = () => {
  // 記事
  const Preview = styled.img`
    width: 100%;
  `;

  const PreviewCover = styled.div`
    width: 150px;
    height: 300px;
  `;

  const Container = styled.table`
    display: flex;
  `;

  const [articles, setArticles] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    (async () => {
      const authObject = getAuth();
      const userInfo = authObject.currentUser;
      const list = [];

      // 添削ドキュメント参照
      const usersCollectionRef = collection(db, "corrections");
      const q = query(usersCollectionRef, where("user_id", "==", userInfo.uid));
      const querySnapshot = await getDocs(q);
      // ログインしているユーザーの記事をlistに保存
      querySnapshot.forEach((document) => {
        const item = [];
        item.push(document.data().image_path);
        item.push(document.data().body);
        item.push(document.data().user_id);
        item.push(document.id);
        list.push(item);
      });
      setArticles(list);
    })();
  }, [update]);

  // 添削投稿の表示
  return (
    <>
      {articles.map((item, index) => {
        return (
          <div key={index}>
            <Container>
              <tbody>
                <tr>
                  <td>
                    <PreviewCover>
                      <Preview src={item[0]} alt="article_img" />
                    </PreviewCover>
                  </td>
                  <td>
                    <p>{item[1]}</p>
                    <div>
                      <DisplayTags documentId={item[3]} />
                    </div>
                  </td>
                  <td>
                    <ArticleDelete articleId={item[3]} setUpdate={setUpdate} update={update} />
                  </td>
                </tr>
              </tbody>
            </Container>
          </div>
        );
      })}
    </>
  );
};

export default ArticleItems;
