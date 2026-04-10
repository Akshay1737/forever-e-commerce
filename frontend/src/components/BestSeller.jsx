import React, { useContext, useMemo } from 'react'

import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestSeller = useMemo(
    () => products.filter((item) => item.bestseller).slice(0, 5),
    [products],
  );


  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1={'Best '} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Handpicked favorites our customers love most for style, comfort, and everyday wear.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {
            bestSeller.map((item) => (
              <ProductItem key={item._id}
                id={item._id} name={item.name} image={item.image} price={item.price} />

            ))

          }
        </div>
      </div>
    </div>
  )
}

export default BestSeller

