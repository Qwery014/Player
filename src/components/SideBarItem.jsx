import React from 'react';
import { useDispatch } from 'react-redux';
import { switchTrack } from "../store/style/styleSlice";

const SideBarItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <a
      className="sidebar__main_item"
      onClick={() => dispatch(switchTrack(item.id - 1))}
    >
      <img
        src={item.cover}
        className="sidebar__main_item_cover"
        alt='img'
      />
      <div className="sidebar__main_item_name">
        {item.name}
      </div>
      <div className="sidebar__main_item_author">
        {item.author}
      </div>
    </a>
  );
};

export default SideBarItem;