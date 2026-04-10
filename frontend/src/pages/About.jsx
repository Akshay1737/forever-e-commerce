import React from 'react'
import Title from '../components/Title'
import assets from '../assets/assets'
import Newsletter from '../components/Newsletterbox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />

      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className='w-full md:max-w-112.5' />
        <div className="flex flex-col justify-center gap-6 md:w-3/4 text-gray-600">
          <p className="">We started with a simple idea: make everyday fashion feel effortless, affordable, and reliable. From curated collections to easy checkout and fast delivery, every part of our store is designed to give you a smooth shopping experience from start to finish.</p>
          <p className="">What began as a small online collection has grown into a trusted destination for modern essentials and trend-forward styles. We carefully select every item to balance comfort, quality, and design so you can find pieces that work for real life, not just special occasions.</p>
          <p className="">Our team focuses on quality products, honest pricing, and customer-first service. Whether you are updating your wardrobe or looking for a single standout piece, we are here to help you shop with confidence and style.</p>
          <p className="">We also believe great shopping is about more than products. It is about transparency, dependable support, and a brand that listens. Your feedback helps us improve every collection, every feature, and every step of your journey with us.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>To provide high-quality, stylish clothing at affordable prices, while delivering exceptional customer service and a seamless shopping experience.</p>
        </div>
      </div>
      <div className="tetx-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border w-full px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border w-full px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>with our user-friendly interface and fast delivery options.</p>
        </div>
        <div className="border w-full px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>We are committed to providing outstanding customer support and ensuring your shopping experience is seamless and enjoyable.</p>
        </div>

      </div>
      <Newsletter/>
    </div>
  )
}

export default About
