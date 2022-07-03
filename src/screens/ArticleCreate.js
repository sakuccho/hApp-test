import React from "react";
import { SecondArticleDisplay, Header } from "../components";
import {} from "../media/media"
import { useLocation } from 'react-router-dom';

const ArticleCreate = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <SecondArticleDisplay imageUrl={location.state.imageUrl} imageName={location.state.imageName} />
    </>
  );
};

export default ArticleCreate;
