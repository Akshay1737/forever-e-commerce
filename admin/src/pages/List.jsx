import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendUrl, currency } from '../App.jsx'
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list,setList]=useState([]);

  const fetchList   = async()=>{
    try{
      const response = await axios.get(backendUrl +'/api/product/list')
      if (response.data.success){
        setList(Array.isArray(response.data.products) ? response.data.products : []);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      toast.error(`Error fetching product list: ${error.message}`);
      setList([]);
    }

  }
  const removeProduct =async (id) =>{
    try{
      const response = await axios.delete(
        backendUrl + '/api/product/remove',
        { data: { id }, headers: { token } }
      )
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message);

      }
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <>
    <p className="mb-2">All Products List </p>
    <div className="flex flex-col gap-2">
      {/**-------list Table Titel */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-gray-800  bg-gray-200 py-1 px-2  text-sm">
        <b className="">Image</b>
        <b className="">Name</b>
        <b className="">Category</b>
        <b className="">Price</b>
        <b className="text-center">Actions</b>
      </div>
      {/*product list  */}
      {
        (Array.isArray(list) ? list : []).map((item)=>(

          <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border  border-gray-400 text-sm'>
            <img src={item.image[0]}  className="w-18" />
            <p className="">{item.name}</p>
            <p className="ml-3">{item.category}</p>
            <p className="">{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg
            
            ">X </p>
          </div>

        ))
      }
    </div>
    
    </>
  )
}

export default List
