import React from 'react';
import logo from '../assets/logo1.png';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const Header = () => {
  const { IoPhonePortraitOutline, MdMail, FaUserCircle, BsHandbagFill } = icons;

  return (
    <div className='border w-main flex justify-between h-[110px]'>
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className='w-[234px] object-contain py-[10px]' />
        </Link>
      <div className='flex text-[13px] py-[35px] '>
        <div className='flex flex-col items-center px-6 border-r border-red-500'>
          <span className='flex items-center gap-4'>
            <IoPhonePortraitOutline color='red' />
            <span className='font-semibold'>(079) 0909 090 </span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center px-6 border-r border-red-500'>
          <span className='flex items-center gap-4'>
            <MdMail color='red' />
            <span className='font-semibold'>SUPPORT@GMAIL.COM</span>
          </span>
          <span>ONLINE SUPPORT 24/7</span>
        </div>
        <div className='flex flex-col items-center px-6 border-r border-red-500'>
          <BsHandbagFill color='red' />
          <span>0 item(s)</span>
        </div>
        <div className='flex justify-center items-center px-6'>
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
}

export default Header;
