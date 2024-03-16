import React from 'react';
import { formatMoney, renderStarFromNumber } from '../ultils/helper';

const ProductCard = ({ title, totalRatings, price, image }) => {
    return (
        <div className='w-1/3 flex flex-auto px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={image} alt='products' className='w-[90px] object-contain p-4' />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                    <span className='line-clamp-1 capitalize text-sm'>{title.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings)?.map((el,index)=>(
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{`${formatMoney(price)} VND`}</span>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;
