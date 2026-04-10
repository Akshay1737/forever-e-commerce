import React, { useContext, useState } from 'react'
import Title from '../components/Title.jsx'
import CartTotal from '../components/CartTotal.jsx'
import assets from '../assets/assets.js'
import Button from '@mui/material/Button';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
const PlaceOrder = () => {

  const [method ,setMethod] =useState('cod')
  const {navigate ,backendUrl ,token ,cartItems ,setCartItems ,getCartAmount ,delivery_fee,products } =useContext(ShopContext);
const [formData,setFormData] =useState({
  firstName:'',
  lastName:"",
  email:'',
  street:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''

  
})
const onChangeHandler =(event)=>{
  const name =event.target.name;
  const value =event.target.value;

  setFormData(data =>({...data,[name]:value}))
}
  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {

    let orderItems =[]

    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          const itemInfo =structuredClone(products.find(product=>product._id === items))
          if(itemInfo){
            itemInfo.size =item
            itemInfo.quantity =cartItems[items][item]
            orderItems.push(itemInfo)
          }
        }
      }
    }
    let orderData ={
      address :formData,
      items:orderItems,
      amount:getCartAmount() +delivery_fee
    }
    switch(method){
      //api calls dor cod
      case 'cod': {
        const response = await axios.post(backendUrl +'/api/order/place' ,orderData ,{headers:{token}})
        if(response.data.success){
          setCartItems({})
          navigate('/orders')
        }else{
          toast.error(response.data.message)
        }
        break;
      }
      default:
        break;

    }

    
  } catch (error) {
    console.log("error = ",error)
    toast.error(error.message)
  }
}


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4  pt-4 sm:pt-14 min-h-[80vh] border-t'>
      {/*-------------------left side --------------------- */}
      <div className="flex flex-col  gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'}  text2={'INFORMATION'}/>

        </div>
        <div className="flex gap-3">

          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='First Name' />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Last Name' />

        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='email' placeholder='Enter Email' />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Street' />
        <div className="flex gap-3">

          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='State' />

        </div>
        <div className="flex gap-3">

          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='number' placeholder='Zipcode' />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Country' />

        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='number' placeholder='phone' />
      </div>
      {/*-------right side ----- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>

        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/*PAYMENT METHOD SELECTION  */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="payment_method" className="h-5 mx-4" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="payment_method" className="h-5 mx-4" />
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <p className="text-gray-500  text-sm font-medium mx-4">CASH ON DELIVERY</p>            </div>
          </div>

        </div>
        <div className="w-full text-end mt-8">
          <Button type='submit' className="" variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    paddingX: '31px',
                    paddingY: '11px',
                    fontSize: '13px',
                    '&:hover': {
                      backgroundColor: 'green',
                    },
                  }}
                >
                  Place Order
              </Button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
