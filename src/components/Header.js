import "./assets/styles/base.css";
import styled from "styled-components";
import Folder from "../imgs/folder.png";
import HomePng from "../imgs/home.png";
import { Link } from "react-router-dom";

const Header = () => {
  const Img = styled.img`
    width: 31px;
  `;

  return(
    <>
      <header>
          <ul className="headerUl">
            <li className="headerLi"><Link to="/hApp-test/"><Img src={HomePng} alt="Home"/></Link></li>
            <li className="headerLi"><Link to="/hApp-test/UserLibrary"><img src={Folder} alt="folder"/></Link></li>
          </ul>
        </header>
    </>
  )
}

export default Header;