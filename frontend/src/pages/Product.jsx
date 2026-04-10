import React, { useContext,useEffect,useState } from 'react'
import { useParams  } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


const Product = () => {
   const {productId}=useParams();
   const {products,currency ,addToCart}=useContext(ShopContext);
 const [productData,setProductData]=useState(false);
 const [image,setImage]=useState('');
 const [size,setSize]=useState('');
   const [value, setValue] = React.useState(2);

   useEffect(()=>{
     const fetchProductData=async()=>{
          products.find((item)=>{
            if(item._id === productId){
                setProductData(item);
                console.log(item)
                setImage(item.image[0]);

                
                return null;
            }
          })
     }
     fetchProductData();
   },[products,productId])

 
  return productData ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/*Product data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* ------------product images ----------------*/}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                 {
                  productData.image.map((item,index)=>(
                    <img onClick={()=>setImage(item)}  src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
                  ))
                  
                 }
                 
            </div>
            <div className="w-full sm:w-[80%]">
              
              <img src={image} alt="Product Image" className="w-full h-auto  " />
            </div>

          </div>
          {/* -------------product details------------------*/}
          <div className="flex-1"> 
            <h1 className="font-medium text-2xl mt-2">
              {productData.name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                  setValue(newValue);
                  }}
               />
              
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5  font-medium text-xl  ">{currency}{productData.price}</p>
            <p className='mt-5 font-medium text-xl text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {
                  productData.sizes.map((item,index)=>(
                    <button onClick={()=>{setSize(item)}} className={`border border-black-100 py-2 px-4 bg-gray-100  ${item ===size ? 'border-orange-500 ' : ''}`} key={index}>{item}</button>
                  ))
                }
              </div>

            </div>
            <Button onClick={()=>addToCart(productData._id,size)} variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    paddingX: '31px',
                    paddingY: '11px',
                    fontSize: '13px',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Add To Cart
              </Button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm  text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>100% Orignal Product.</p>
                  <p>cash on delivery is avilable on this product.</p>
                  <p> Easy return and Exchange policy within 7 days.</p>
              </div>
          </div>
          
        </div>
        {/* Desciption and Revive section*/}   
        <div className="mt-20">
          <div className="flex">
            <p className="border px-5 py-3 text-sm">
              description

            </p>
            <p className="border px-5 py-3 text-sm">
              Reviews (112)

            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
  <p>
    This premium product is crafted using high-quality materials to ensure
    durability, comfort, and long-lasting performance. Designed with attention
    to detail, it offers a perfect balance of style and functionality for
    everyday use.
  </p>
  <p>
    Whether you're using it for casual wear or special occasions, this product
    delivers a superior experience with excellent finishing, modern design,
    and reliable quality standards.
  </p>
</div>


        </div>
        {/*displayu related products */}
        <RelatedProducts category={productData.category} subcCategory={productData.subCategory}></RelatedProducts>
    </div>
  ) :<div className='opacity-0'>Loading...</div>
}

export default Product