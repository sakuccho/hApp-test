import React, {useState} from 'react';
import { ArticleItems, Search, ResultItems } from "../../components";

const MyFolder = () => {
  const [searchValue, setSearchValue] = useState("");
  const [goBack, setGoBack] = useState("");

  return(
    <div>
      <Search setSearchValue={setSearchValue}/>
      <p>{searchValue}</p>
      {
        goBack ? <ArticleItems /> : (!searchValue ? <ArticleItems /> : <ResultItems searchValue={searchValue} setGoBack={setGoBack} />)
      }
    </div>
  )
}

export default MyFolder;