import React from 'react'
import assets from '../assets/assets'

const Footer = () => {
  return (
   <div>
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small'>
        <div>
            <img src={assets.logo} alt="" className="mb-5 w-32" />
            <p className="w-full md:w-2/3 text-gray-600">Your trusted destination for quality fashion at honest prices. We bring thoughtfully selected styles, secure checkout, and dependable support to make every shopping experience simple and enjoyable.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>

            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+919423271737</li>
                <li>contact@company.com</li>
            </ul>
        </div>
        
    </div>
    <div>
        <hr />
        <p className='text-center py-5 text-sm'>Copyright 2026@ forever.com -All Rights Reserved.</p>

    </div>
   </div>
  )
}

export default Footer
