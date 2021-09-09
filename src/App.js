import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import Movies from "./features/movies/Movies";

function App() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const inputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="App bg-custom-gray text-white">
      <div className="fixed top-0 w-full z-50">
        {" "}
        <nav className="h-16 w-full bg-black ">
          <div className="flex justify-between items-center w-11/12 m-auto h-full">
            <div className="flex justify-start items-center">
              <AiOutlineArrowLeft size="25" />
              <h1 className="font-bold ml-2">Romantic Comedy</h1>
            </div>

            {isSearchClicked && (
              <input
                type="text"
                value={searchInput}
                onChange={inputChangeHandler}
                className="text-black"
              />
            )}
            <FiSearch size="25" onClick={() => setIsSearchClicked(true)} />
          </div>
        </nav>
        <div
          className="h-4"
          style={{
            backgroundImage: "linear-gradient(black, transparent)",
          }}
        />
      </div>
      <Movies searchInput={searchInput} />
    </div>
  );
}

// const MemoizedApp = React.memo(App);
export default App;
