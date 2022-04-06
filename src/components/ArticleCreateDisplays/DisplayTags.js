import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { SearchTags } from "../../components";


const DisplayTags = (props) => {
  const [tag, setTag] = useState([]);

  useEffect(() => {
    (async () => {
      const tag = [];
      const documentId = props.documentId;
      const tagsRef = collection(db, "attachedTag");
      const q = query(tagsRef, where("article_id", "==", documentId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        tag.push(document.data().tag_id);
      });
      setTag(tag);
    })();
  }, []);


  return (
    <div>
      {
        tag.map((document, index) => {
          return (
            <div key={index}>
              <SearchTags documentId={document} />
            </div>
          )
        })
      }
    </div>
  );
};

export default DisplayTags;
