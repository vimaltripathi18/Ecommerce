import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

    <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}/>
    </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-500'>Naini Praygraj <br />Jhunsi Prayagraj <br /> </p>
          <p className='text-gray-500'>Contact Number:987654321 <br /> E-mail:piiwear@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at  πWEAR</p>
          <p className='text-gray-500'>Learn more about our team and job opeanings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-red-600 hover:text-white transition-all duration-500'>Explore Us</button>
        </div>
    </div>

    <NewsletterBox/>
    </div>
  )
}

export default Contact