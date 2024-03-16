import React from 'react';
import { Sidebar, Banner, BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components';
import { useSelector } from 'react-redux'
import icons from '../../ultils/icons';

const { IoIosArrowForward } = icons

const Home = () => {

  const { newProducts } = useSelector(state => state.product)
  const { category } = useSelector(state => state.app)
  const {isLoggedIn, current} = useSelector(state => state.user)

  console.log({isLoggedIn, current})

  return (
    <>
      <div className='w-main flex'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto'>
          <Sidebar />
          <DealDaily />
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className='my-8'>
        <FeatureProducts />
      </div>
      <div className='my-8 w-full'>
        <h3 className='capitalize text-[20px] font-semibold py-[15px] border-b-2 border-main'>new arrivals</h3>
        <div className='mt-4 mx-[-10px]'>
          <CustomSlider
            products={newProducts}
          />
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='capitalize text-[20px] font-semibold py-[15px] border-b-2 border-main'>hot collections</h3>
        <div className='flex flex-wrap gap-4 mt-4'>
          {category?.filter(el => el.brand.length > 0)?.map(el => (
            <div
              key={el._id}
              className='w-[396px]'
            >
              <div className='border flex gap-4 min-h-[190px]'>
                <img src={el?.image} alt='' className='flex-1 w-[144px] h-[159px] object-cover' />
                <div className='flex-1 text-gray-700'>
                  <h4 className='font-semibold uppercase'>{el.title}</h4>
                  <ul className='text-sm'>
                    {el?.brand?.map((item, index) => (
                      <span key={index} className='flex gap-1 items-center text-gray-500 cursor-pointer hover:text-orange-600'>
                        <IoIosArrowForward />
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main capitalize'>Blog posts</h3>
      </div>
      <div className='w-full h-[500px] border border-main capitalize'> footer</div>
    </>
  );
}

export default Home;
