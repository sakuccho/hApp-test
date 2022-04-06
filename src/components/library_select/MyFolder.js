import React, {useState} from 'react';
import { ArticleItems, Search, ResultItems } from "../../components";

const MyFolder = () => {
  const [searchValue, setSearchValue] = useState("");

  return(
    <div>
      <Search setSearchValue={setSearchValue}/>
      <p>{searchValue}</p>
      {
        !searchValue ? <ArticleItems /> : <ResultItems searchValue={searchValue} />
      }
    </div>
  )
}

export default MyFolder;