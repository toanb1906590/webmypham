import React, { useState, useEffect , memo} from 'react';
import icons from '../ultils/icons';
import { apiGetProducts } from '../apis/product'
import { renderStarFromNumber, formatMoney } from '../ultils/helper'
import { Countdown } from '../components'
// import { IoDiamondOutline } from 'react-icons/io5';
// import { MdExpandCircleDown } from 'react-icons/md';

const { AiFillStar, AiOutlineMenu } = icons;

let idInterval

const DealDaily = () => {

    const [dealdaily, setDealDaily] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expireTime, setExpireTime] = useState(false)

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random()*10) , totalRatings: 5})
        if (response.success){ 
            setDealDaily(response.product[0])
            const h = 24 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            
            setHour(h)
            setMinute(m)
            setSecond(s)
        }else{
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }

    useEffect(() => {
        fetchDealDaily()
    }, [])

    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }, [expireTime])

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {
                    setMinute(prev => prev - 1)
                    setSecond(59)
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1)
                        setMinute(59)
                        setSecond(59)
                    } else {
                        setExpireTime(!expireTime)
                    }
                }
            }
        }, 1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime])
    return (
        <div className='w-full flex-auto border'>
            <div className='flex items-center justify-between p-4 w-full'>
                <span className='flex flex-1 justify-center'><AiFillStar color='orange' size={20} /></span>
                <span className=' flex-8 font-bold uppercase text-[20px] text-center'>deal daily</span>
                <span className='flex-1'></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img src={dealdaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt='dealdaily'
                    className='w-full object-contain' />
                <span className='line-clamp-1 capitalize text-center'>{dealdaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealdaily?.totalRatings)?.map((el,index)=>(
                    <span key={index}>{el}</span>
                ))}</span>
                <span>{`${formatMoney(dealdaily?.price)} VND`}</span>
            </div>
            <div className='px-4 mt-4'>
                <div className='flex justify-center gap-2 items-center mb-4'>
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minute} />
                    <Countdown unit={'Seconds'} number={second} />
                </div>
                <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-black text-white font-medium py-2'>
                    <AiOutlineMenu />
                    <span className='capitalize'>options</span>
                </button>

            </div>
        </div>
    );
}

export default memo(DealDaily);