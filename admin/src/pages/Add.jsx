import React, { useState } from 'react';
import assets from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async () => {
    event.preventDefault();
     try {
      const formData = new FormData(); // Corrected

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller); // Corrected
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4); // Corrected



const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}});
      
if(response.data.success){
  toast.success(response.data.message)
  setName('')
  setDescription('')
  setImage1(false)
  setImage2(false)
  setImage3(false)
  setImage4(false)
  setPrice('')
}  else{
  toast.error(response.data.message)
}
      
     } catch (error) {
      console.log(error);
      toast.error(error.message)
     }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-3 items-start">
      <div>
        <p className="mb-3">Upload Image</p>
        <div className="flex gap-3">
          <label htmlFor="image1">
            <img className="w-40" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-40" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-40" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-40" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 mt-5">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Product Name" required />
      </div>
      <div className="w-full">
        <p className="mb-2 mt-5">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" placeholder="Write about the product" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 mt-5">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 mt-5">Sub Category</p>
          <select onChange={(e) => setSubcategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 mt-5">Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="price" />
        </div>
      </div>

      <div>
        <p className="mb-2 mt-5">Product sizes</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-red-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-red-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-red-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-red-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-red-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        <input onChange={() => setBestseller(prev =>!prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer text-lg" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-red-600 text-white">ADD</button>
    </form>
  );
};

export default Add;
