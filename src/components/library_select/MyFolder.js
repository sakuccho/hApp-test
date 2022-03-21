import React, {useState} from 'react';
import { ArticleItems, Search } from "../../components";

const MyFolder = () => {
  const [searchValue, setSearchValue] = useState("");

  return(
    <div>
      <Search setSearchValue={setSearchValue}/>
      <p>{searchValue}</p>
      <ArticleItems />
    </div>
  )
}

export default MyFolder;