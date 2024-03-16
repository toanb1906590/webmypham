import React, { useState } from 'react';
import { formatMoney } from '../ultils/helper'
import newlabel from '../assets/new.png'
import trending from '../assets/trending.png'
import { renderStarFromNumber } from '../ultils/helper'
import { SelectOption } from './'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom';
import path from '../ultils/path'

const { AiFillEye, AiOutlineMenu, AiFillHeart } = icons

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link
        className='w-full border p-[15px] flex flex-col items-center'
        to={`${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
        onMouseEnter={e => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIsShowOption(false)
        }}  >
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-0 left-0 right-0 flex justify-center animate-slide-top'>
            <SelectOption icons={<AiFillHeart key='heart' />} />
            <SelectOption icons={<AiOutlineMenu key='menu' />} />
            <SelectOption icons={<AiFillEye key='eye ' />} />
          </div>}
          <img
            src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
            alt='avatar'
            className='w-[274px] h-[274px] object-cover'
          />
          <img
            src={isNew ? newlabel : trending}
            alt='label'
            className='absolute top-0 right-0 w-[100px] h-[35px] object-cover'
          />
        </div>
        <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
          <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}</span>
          <span className='line-clamp-1 capitalize'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div >
  );
}

export default Product;