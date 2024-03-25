import React from "react";
import "../home/Home.css";
import SearchList from "../../component/SearchList/SearchList";
import Header from "../../component/Home/Header/Header";

const Search = () => {
  return (
    <>
      <div className="searchlist">
        <SearchList />
      </div>
    </>
  );
};

export default Search;
