import React, { useState } from "react";
import { UserLibrarySelect, Header } from "../components";
import "./assets/styles/nav.css";

const UserLibrary = () => {
  const [judge, setJudge] = useState(true);
  const handleFolder = () => setJudge(true);
  const handleCorrect = () => setJudge(false);

  return (
    <>
      <Header />
      <div className="ui container">
        <nav>
          <ul>
            <li className="current"><button onClick={handleFolder}>自分の作品</button></li>
            <li><button onClick={handleCorrect}>添削作品</button></li>
          </ul>
        </nav>
        <UserLibrarySelect judge={judge} />
      </div>
    </>
  );
};

export default UserLibrary;
