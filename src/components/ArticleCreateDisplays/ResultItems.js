import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { DisplayTags, ArticleDelete } from "..";

const ResultItems = (props) => {
  const [result, setResult] = useState([]);
  const [update, setUpdate] = useState(true);

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

  useEffect(() => {
    (async () => {
      // 検索した文字のID取得
      const searchTagId = [];
      const tagNameRef = collection(db, "tags");
      const tagNameQ = query(
        tagNameRef,
        where("tag_name", "==", props.searchValue)
      );
      const tagNameSnapshot = await getDocs(tagNameQ);
      if (tagNameSnapshot.docs.length !== 0) {
        tagNameSnapshot.forEach((document) => {
          searchTagId.push(document.id);
        });
        // attachedTagから記事を検索(userの区別はできていない)
        const articleList = [];
        const tagsCollectionRef = collection(db, "attachedTag");
        const tagQ = query(
          tagsCollectionRef,
          where("tag_id", "==", searchTagId[0])
        );
        const tagQuerySnapshot = await getDocs(tagQ);
        tagQuerySnapshot.forEach((document) => {
          articleList.push(document.data().article_id);
        });

        const documentIdList = [];
        for (let i = 0; i < articleList.length; i++) {
          const authObject = getAuth();
          const userInfo = authObject.currentUser;
          // correctionsドキュメント参照
          const usersCollectionRef = doc(db, "corrections", articleList[i]);
          const querySnapshot = await getDoc(usersCollectionRef);
          // ログインしているユーザーの記事をlistに保存
          if (querySnapshot.exists()) {
            if (querySnapshot.data().user_id === userInfo.uid) {
              const item = [];
              item.push(querySnapshot.data().image_path);
              item.push(querySnapshot.data().body);
              item.push(querySnapshot.data().user_id);
              item.push(querySnapshot.id);
              documentIdList.push(item);
            }
          } else {
            console.log("お待ちを");
          }
        }
        setResult(documentIdList);
      } else {
        console.log("そのtagはないよお");
        setResult("nothing");
      }
    })();
  }, [props.searchValue, update]);

  if (result === "nothing" ) {
    return (
      <>
        <p>検索結果なし</p>
      </>
    )
  } else {
    return (
      <>
        <button onClick={props.setGoBack(true)}>ぱ</button>
        {result.map((item, index) => {
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
  }
};

export default ResultItems;
