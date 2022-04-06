import React from "react";
import styled from "styled-components";
import { FirstArticleDisplay, Header } from "../components";
import {} from "../media/media"

const ArticleCreate = () => {
  const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    justify-content: center;
  `;

  const Card = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20px;
  `;

  const CardContainer = styled.div`
    background: white;
    width: 700px;
    height: 500px;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: 10px;
    padding-bottom: 40px;
    > h4 {
      font-size: 20px;
      padding: 15px 0 5px 0;
    }
  `;

  return (
    <>
      <Header />
      <Wrapper>
        <Card>
          <CardContainer>
            <FirstArticleDisplay />
          </CardContainer>
        </Card>
      </Wrapper>
    </>
  );
};

export default ArticleCreate;
