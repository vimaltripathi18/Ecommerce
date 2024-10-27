import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size,setSize]=useState('');

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-7 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="Product Image"
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2 '>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
             <p>Select Size</p>
             <div className='flex gap-2'>
               {productData.sizes.map((item,index)=>(
               <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-red-500' : ''}`} key={index}>{item}</button>
               ))}
             </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-red-600'>ADD TO CART</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product</p>
          <p>Cash On Delivery avlaible on this product</p>
          <p>Easy exchange and return policy within 7 days</p>
          </div>
        </div>
      </div>
       {/* Review Section */}
       <div className='mt-20'>
         <div className='flex'>
           <b className='border px-5 py-3 text-sm'>Description</b>
           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
         </div>
         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi in tempora facere nisi minus sunt corporis error explicabo cumque, ab nemo fugit quod impedit, voluptatum consequatur hic! Facere, hic assumenda?</p>
           <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic cum sit facilis dolor debitis, quas aliquam officiis magnam minus. Amet! minus sunt corporis error explicabo cumque, ab nemo fugit quod impedit,</p>
         </div>
       </div>
       <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
  
};

export default Product;
