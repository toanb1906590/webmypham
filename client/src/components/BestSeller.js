import React from 'react';
import { useState, useEffect } from 'react';
import { apiGetProducts } from '../apis/product'
import { CustomSlider } from './'
import {getNewProducts} from '../store/products/asyncActions'
import { useDispatch, useSelector } from 'react-redux';

const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
    { id: 3, name: 'tablet' }
]

const BestSeller = () => {

    const [bestSellers, setBestSeller] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products,setProducts] = useState(null)
    const dispatch = useDispatch()
    const {newProducts} = useSelector(state => state.product)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' })
        if (response.success) {
            setBestSeller(response.product)
            setProducts(response.product)
        }
    }

    useEffect(() => {
        dispatch(getNewProducts())
        fetchProducts() 
    }, [dispatch])

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers)
        if (activedTab === 2) setProducts(newProducts)
    }, [activedTab, bestSellers, newProducts])

    return (
        <div>
            <div className='flex text-[20px] pb-4 ml-[-32px]'>
                {tabs.map(el => (
                    <span   
                        key={el.id}
                        className={`font-semibold cursor-pointer capitalize px-8 border-r text-gray-400 ${activedTab === el.id ? 'text-gray-900' : ''}`}
                        onClick={() => setActivedTab(el.id)}>
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-t-2 border-main pt-4'>
                <CustomSlider products={products} activedTab={activedTab}/>
            </div>
            <div className='w-full flex gap-4 mt-4'>        
                <img
                    src='https://topprint.vn/wp-content/uploads/2021/07/banner-my-pham-dep-12-1024x390.png'
                    alt='banner'
                    className='w-1/2 flex-1 object-contain'
                />
                <img
                    src='https://topprint.vn/wp-content/uploads/2021/07/banner-my-pham-dep-12-1024x390.png'
                    alt='banner'
                    className='w-1/2 flex-1 object-contain'
                />
            </div>
        </div>                  
    );  
}

export default BestSeller;
