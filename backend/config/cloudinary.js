import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECREAT_KEY
    });
    console.log('Cloudinary connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectCloudinary;