import { auth } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ArticleCreate, ArticleItems } from "../components";

const Home = () => {

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  if (!user) {
    return <Navigate to="/" /> //一時的に変えてる。本当はto="/Login" />
  } else {
    return (
      <>
        <h1>Home</h1>
        <button onClick={handleLogout}>ログアウト</button>
        <ArticleCreate />
        <ArticleItems />
      </>
    );
  }
};

export default Home;
