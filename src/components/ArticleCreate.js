import React, { useState } from "react";
import styled from "styled-components";
import { FirstArticleDisplay } from "../components";
import {} from "../media/media"

const ArticleCreate = () => {
  const [move, setMove] = useState("none");
  const handleDisplay = () => setMove("flex");

  const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);

    width: 100%;
    height: 100vh;
    display: ${move};
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
      <button onClick={handleDisplay}>投稿</button>
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
