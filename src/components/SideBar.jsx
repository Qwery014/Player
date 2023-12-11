import React, { useState } from 'react';
import "../styles/SideBar.scss";
import { LuListMusic } from "react-icons/lu";
import { LuPaintbrush2 } from "react-icons/lu";

import { useDispatch, useSelector } from 'react-redux';
import { clickBurger } from "../store/style/styleSlice"
import MusicTab from './MusicTab';
import ThemesTab from './ThemesTab';

const SideBar = () => {
  const burger = useSelector((state) => state.style.burger);
  const theme = useSelector((state) => state.style.theme);
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);

  return (
    <>
      <div className={`sidebar ${burger ? "sidebar-active" : ""}`}>
        <div className={`sidebar__wrapper ${burger ? "sidebar__wrapper-active" : ""}`}>
          <a
            className={`burger ${burger ? "burger-active" : ""}`}
            onClick={() => dispatch(clickBurger())}
          >
            <span
              className={
                `burger-line ${theme.isDark ? "burger-light" : "burger-dark"}`
              }
            ></span>
          </a>
          <div className="sidebar__tabs">
            <a className={`sidebar__tabs_item ${!tab ? "tab-active" : ""}`} onClick={() => setTab(0)}>
              <LuListMusic />
            </a>
            <a className={`sidebar__tabs_item ${tab ? "tab-active" : ""}`} onClick={() => setTab(1)}>
              <LuPaintbrush2 />
            </a>
          </div>
          {
            tab ? <ThemesTab /> : <MusicTab />
          }
        </div>
      </div>
    </>
  );
};

export default SideBar;