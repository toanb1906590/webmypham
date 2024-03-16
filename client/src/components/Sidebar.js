import React from 'react';
import { NavLink } from 'react-router-dom'
import { createSlug } from '../ultils/helper'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const { category } = useSelector(state => state.app)

  return (
    <div className='flex flex-col border capitalize'>
      {category?.map(el => (
        <NavLink
          to={createSlug(el.title)}
          key={createSlug(el.title)} // Sử dụng một giá trị duy nhất cho key
          className={({ isActive }) => isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
            : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'}>
          {el.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;

