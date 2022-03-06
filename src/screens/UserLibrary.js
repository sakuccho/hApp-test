import React, { useState } from "react";
import { UserLibrarySelect } from "../components";

const UserLibrary = () => {
  const [judge, setJudge] = useState(true);
  const handleFolder = () => (setJudge(true));
  const handleCorrect = () => (setJudge(false));

  return (
    <div className="ui container">
      <div>
        <button onClick={handleFolder}>自分の作品</button>
        <button onClick={handleCorrect}>添削作品</button>
      </div>
      <UserLibrarySelect judge={judge} />
    </div>
  );
};

export default UserLibrary;
