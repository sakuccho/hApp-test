import "./assets/styles/base.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Logout, NewPost } from "../components";
import React, { useState } from "react";

const Header = () => {
  const [newPostOpen, setNewPostOpen] = useState(false);

  const handleNewPost = () => {
    setNewPostOpen(true);
  };

  return (
    <>
      <header>
        <div className="headerContainer">
          <ul className="headerUl">
            {/* ホーム画面リンク */}
            <li className="headerLi">
              <Link to="/hApp-test/">
                <HomeIcon
                  sx={{
                    color: "#333333",
                    fontSize: 40,
                  }}
                />
              </Link>
            </li>
            {/* マイフォルダーリンク */}
            <li className="headerLi">
              <Link to="/hApp-test/userLibrary">
                <FolderIcon
                  sx={{
                    color: "#333333",
                    fontSize: 40,
                  }}
                />
              </Link>
            </li>
            {/* 新規投稿 */}
            <li className="headerLi">
              <button className="newPostButton" onClick={handleNewPost}>
                <AddBoxRoundedIcon
                  className="backButton"
                  sx={{
                    color: "#333333",
                    fontSize: 40,
                  }}
                />
              </button>
            </li>
          </ul>
          <NewPost newPostOpen={newPostOpen} setNewPostOpen={setNewPostOpen} />
          <Logout />
        </div>
      </header>
    </>
  );
};

export default Header;
