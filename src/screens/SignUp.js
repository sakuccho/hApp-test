import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';


const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      const authObject = getAuth();
      const user = authObject.currentUser;
      if (user !== null) {
        const usersCollectionRef = collection(db, 'users');
        const documentRef = await addDoc(usersCollectionRef, {
          user_id: user.uid,
          email: email.value,
          password: password.value,
        });
        console.log(documentRef);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      {error && <p style={{ color: 'red' }}>※入力した情報は使用できません</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;