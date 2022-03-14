import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { SignUp, Home, Login, UserLibrary } from "./screens";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <div style={{ margin: "2em" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/hApp-test" element={<Home />} />
            <Route path="/hApp-test/signup" element={<SignUp />} />
            <Route path="/hApp-test/login" element={<Login/>} />
            <Route path="/hApp-test/UserLibrary" element={<UserLibrary/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
