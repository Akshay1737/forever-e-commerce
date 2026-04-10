import React from 'react'
import Button from '@mui/material/Button';

const Newsletterbox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();}
  return (
    <div  className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off on your first order!</p>
        <p className="text-gray-400 mt-3">
            Get early access to new collections, exclusive offers, and style updates delivered straight to your inbox.
        </p>
        <form onSubmit={onSubmitHandler} className='input1 w-full sm:w-1/2 flex items-center  gap-3 mx-auto my-6 border pl-3' action="#">
            <input className='  w-full sm:flex-1 outline-none  bg-white '  type="email" placeholder='Enter your email' required/>
           
             <Button  type='submit' variant="contained"
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
                  Subscribe
              </Button>
            
        </form>

    </div>
  )
}

export default Newsletterbox
