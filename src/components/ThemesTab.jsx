import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBlur, setTheme } from '../store/style/styleSlice';
import { backgrounds } from './consts';


export const ThemeCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <>
      <a
        className="themes__item"
        onClick={() => dispatch(setTheme(item))}
      >
        <div className="themes__item_name">
          {item.name}
        </div>
        <video src={item.background} alt="" className='themes__item_preview' />
      </a>
    </>
  )
}


const ThemesTab = () => {
  const dispatch = useDispatch();
  const blur = useSelector(state => state.style.blur);

  return (
    <div className='themes'>
      <div className="themes__slider">
        Blur: <input
          type="range"
          name="blur"
          id="blur"
          value={blur}
          onInput={(e) => dispatch(setBlur(e.target.value))}
          style={{
            backgroundSize: `${blur}% 100%`
          }}
        />
      </div>
      <div className="themes__list">
        {
          backgrounds?.map((e, i) => <ThemeCard item={e} key={i} />)
        }
      </div>
    </div>
  );
};

export default ThemesTab;