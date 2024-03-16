import React, { memo } from 'react';
import icons from '../ultils/icons';

const { MdMail } = icons

const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] bg-main w-full flex flex-col items-center justify-center '>
        <div className='w-main flex items-center justify-between'>
          <div className='flex flex-col flex-1'>
            <span className='text-[20px] text-gray-100 capitalize'>sign up to newsletter</span>
            <small className='text-[13px] text-gray-300 capitalize'>subsribe now and receive weekly newsletter</small>
          </div>
          <div className='flex-1 flex items-center'>
            <input
              className='p-4 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-gray-100 placeholder:opacity-50'
              type='text' name='' id='' placeholder='Email address' />
            <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white'>
              <MdMail size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='h-[407px] bg-gray-800 w-full flex flex-col items-center justify-center text-[13px] text-white'>
        <div className='w-main flex'>
          <div className='flex-2 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
            <span>
              <span className='capitalize'>address: </span>
              <span className='capitalize opacity-10'>ấp 6 _ Thuận Hưng _ Long Mỹ _ Hậu Giang</span>
            </span>
            <span>
              <span className='capitalize'>phone: </span>
              <span className='opacity-70'>(079) 090 9090</span>
            </span>
            <span>
              <span className='capitalize'>email: </span>
              <span className='opacity-70'>chushop@gmail.com</span>
            </span>

          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] uppercase'>information</h3>
            <span className='capitalize'>typography</span>
            <span className='capitalize'>gallery</span>
            <span className='capitalize'>store location</span>
            <span className='capitalize'>today's deals</span>
            <span className='capitalize'>contacts</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] uppercase'>who we are</h3>
            <span className='capitalize'>help</span>
            <span className='capitalize'>free shipping</span>
            <span className='capitalize'>FAQs</span>
            <span className='capitalize'>return & exchange</span>
            <span className='capitalize'>testimonials</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] uppercase'>#digitalworldstore</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
