import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { SignUp, Home, Login, UserLibrary } from "./screens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArticleCreate } from "./components";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/hApp-test" element={<Home />} />
            <Route path="/hApp-test/signup" element={<SignUp />} />
            <Route path="/hApp-test/login" element={<Login/>} />
            <Route path="/hApp-test/userLibrary" element={<UserLibrary/>} />
            <Route path="/hApp-test/createArticle" element={<ArticleCreate/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
