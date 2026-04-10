import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Orders = () => {
  const {backendUrl,currency,token, navigate}=useContext(ShopContext)
  const [orderData,setOrderData]=useState([]);

  const loadOrderData = async ( )=>{
    try {
      if(!token){
        return null
      }
      const response =await axios.post(backendUrl +'/api/order/userOrders',{},{headers:{token}})
      if(response.data.success){
        let allordersitem =[]
        response.data.orders.forEach((order)=>{
          order.items.forEach((item)=>{
            allordersitem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            })
          })
        })
        setOrderData(allordersitem.reverse())
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    loadOrderData();

  },[token])

  return (
    <div className='border-t pt-16'>
        <div className=" text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className="">
          {
            orderData.map((item,index) =>(
              <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4 ">
                <div className="flex items-start gap-6 text-sm">
                  <img className='w-16 sm:w-20' src={Array.isArray(item.image) ? item.image[0] : item.image} alt="" />
                  <div className="">
                    <p className="sm:text-base font-medium">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                      <p className='text-lg'>{currency}{item.price}</p>
                      <p>Quantity : {item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    <p className='mt-2'>Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  </div>

                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  
                  <Button onClick={()=>navigate('/orders')} className="" variant="contained"
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
                  Track Order
              </Button>

                </div>

              </div>
            ))
          }
        </div>
     
    </div>
  )
}

export default Orders
