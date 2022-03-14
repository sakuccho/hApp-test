import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(event.target.elements);
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate("/hApp-test");
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>※入力した情報が間違っております</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
        <div>
          ユーザー登録は<Link to={"/hApp-test/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export default Login;
