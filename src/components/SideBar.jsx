import React, { useEffect, useState } from 'react';
import "../styles/SideBar.scss";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { clickBurger, searching } from "../store/style/styleSlice"
import SideBarItem from './SideBarItem';

const SideBar = () => {
  const burger = useSelector((state) => state.style.burger);
  const trackList = useSelector((state) => state.style.trackList);
  const dispatch = useDispatch();

  const [inpLength, setInpLength] = useState(0);
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(searching(search));
    setInpLength(search.length);
  }, [search])

  return (
    <>
      <div className="sidebar">
        <div className={`sidebar__wrapper ${burger ? "sidebar__wrapper-active" : ""}`}>
          <a
            className={`burger ${burger ? "burger-active" : ""}`}
            onClick={() => dispatch(clickBurger())}
          >
            <span className="burger-line"></span>
          </a>
          <div className="sidebar__main">
            <label className="sidebar__main_search" htmlFor="search">
              <label htmlFor="search" className="sidebar__main_search-icon">
                <FaSearch />
              </label>
              <input
                type="text"
                id='search'
                className="sidebar__main_search-input"
                onInput={(e) => handleSearch(e)}
                value={search}
              />
              <label
                className="sidebar__main_search-erase"
                htmlFor="search"
                onClick={() => setSearch("")}>
                {
                  inpLength ?
                    <AiOutlineClose />
                    : null
                }
              </label>
            </label>
            <div className="sidebar__main_list">
              {
                trackList?.map((e, i) => <SideBarItem item={e} key={i} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;