import React from "react";
import { MyFolder, MyCorrection } from "../../components";

const UserLibrarySelect = (props) => {
  if (props.judge) {
    return <MyFolder />;
  } else {
    return <MyCorrection />;
  }
};

export default UserLibrarySelect;
