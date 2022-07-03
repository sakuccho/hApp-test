import {
  doc,
  getDoc,
  updateDoc,
  deleteField
} from "firebase/firestore";
import { db } from "../../firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import "./assets/styles/base.css";
import { getStorage, ref, deleteObject } from "firebase/storage";

const ArticleDelete = (props) => {
  const handleDelete = async () => {
    const storage = getStorage();

    const articleRef = doc(db, "corrections", props.articleId);
    const querySnapshot = await getDoc(articleRef);
    if(querySnapshot.exists()) {
      const desertRef = ref(storage, 'images/' + querySnapshot.data().image_name);
      deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log("データベースから画像が削除されました。")
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("データベースから画像を削除できませんでした。");
        console.log(error);
      });
    } else {
      console.log("データベースから画像を削除できませんでした。");
    }
    

    await updateDoc(articleRef, {
      body: deleteField(),
      image_path: deleteField(),
      image_name: deleteField(),
      user_id: deleteField(),
    });

    if(props.update) {
      props.setUpdate(false);
    } else {
      props.setUpdate(true);
    }
  }

  return (
    <>
      <button className="deleteButton" onClick={handleDelete}>
        <DeleteIcon sx={{
          color: "#333333",
          fontSize: 40,
        }}  />
      </button>
    </>
  )
}

export default ArticleDelete;