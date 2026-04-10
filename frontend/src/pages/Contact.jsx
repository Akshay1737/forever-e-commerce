import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import assets from '../assets/assets'
import Button from '@mui/material/Button';
import Newsletterbox from '../components/Newsletterbox';
const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <div className="text-center text-2xl pt-10 border-t ">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 ">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-120" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">54709 Willim Station <br />Suite 350, New York, NY 10001</p>
         
          <p className="text-gray-500">Tel:(451) 555-0321  <br />Email: info@ourstore.com</p>
         
          <p className="font-semibold text-xl text-gray-600">Careers At Forever</p>
          <p className="text-gray-500">We're always looking for talented individuals to join our team. Check out our career opportunities!</p>
          
           <Button onClick={()=>navigate('/orders')} className="" variant="contained"
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
                  Explore Jobs
              </Button>

        </div>
      </div>
      <Newsletterbox/>
    </div>
  )
}

export default Contact