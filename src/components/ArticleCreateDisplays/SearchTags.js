import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const SearchTags = (props) => {
  const [tag, setTag] = useState("");

  useEffect(() => {
    (async () => {
      if(props.documentId) {
        const tagName = [];
        const tagRef = doc(db, "tags", props.documentId);
        const documentSnapshot = await getDoc(tagRef);
        if (documentSnapshot.exists()) {
          tagName.push(documentSnapshot.data().tag_name);
        } else {
          console.log("No such document!");
        }
        setTag(tagName);
      } else {
        console.log("お待ちを");
      }
    })();
  }, [props.documentId]);

  return <>{tag}</>;
};

export default SearchTags;
