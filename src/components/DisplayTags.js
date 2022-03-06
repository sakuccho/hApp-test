import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const DisplayTags = (props) => {
  const [tag, setTag] = useState("");

  useEffect(() => {
    (async() => {
      const tag = [];
      const tagId = props.tagsId;
      const tagsRef = doc(db, "tags", tagId);
      const docSnap = await getDoc(tagsRef);
      tag.push(docSnap.data().tag_name);
      setTag(tag);
    })()
  },[]);

  return(
    <div>
      <p>{tag}</p>
    </div>
  )
}

export default DisplayTags;