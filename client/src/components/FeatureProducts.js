import React, { useState, useEffect } from 'react';
import { ProductCard } from './'
import { apiGetProducts } from '../apis/product';
import poster2 from '../assets/poster2.jpg'
import poster3 from '../assets/poster3.jpg'

const FeatureProducts = () => {

    const [products, setProducts] = useState(null)

    const fetchFeatureProduct = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 })
        if (response.success) setProducts(response.product)
    }
    useEffect(() => {
        fetchFeatureProduct()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>Feature Products</h3>
            <div className='flex flex-wrap mt-[15px] mx-[10px]'>
                {products?.map(el => (
                    <ProductCard
                        key={el._id}
                        image={el.thumb}
                        title={el.title}
                        totalRatings={el.totalRatings}
                        price={el.price} />
                ))}
            </div>
            <div className='flex justify-between'>
                <img src={poster2} alt='' className='w-[45%] object-contain' />
                <div className='flex flex-col justify-between w-[24%] h-auto items-center'>
                    <img src={poster3} alt='' className='w-[80%] object-contain'/>
                    <img src={poster2} alt='' className='w-[80%] object-contain'/>
                </div>
                <img src={poster3} alt='' className='w-[32%] object-contain justify-between flex-col h-auto'/>
            </div>
        </div>
    );
}

export default FeatureProducts;
