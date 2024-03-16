import React, {memo} from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path'

const TopHeader = () => {
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
      <span className='uppercase '>order online or call us (079) 090 9090</span>
      <Link to={`/${path.LOGIN}`} className='capitalize hover:text-gray-800'>sign in or create account</Link>
      </div>
    </div>
  );
}

export default memo(TopHeader);
