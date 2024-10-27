import userModel from "../models/userModel.js"  

// Add product to user cart



const addToCart = async (req,res)=>{
   
    try {
       const {userId,itemId, size} = req.body
       
       const usreData = await userModel.findById(userId)
       const cartData = await usreData.cartData

       if(cartData[itemId]){
         if(cartData[itemId][size]){
            cartData[itemId][size] += 1
         }else {
            cartData[itemId][size]=1
         }
       }else {
        cartData[itemId] = {}
        cartData[itemId][size]=1
       }

       await userModel.findByIdAndUpdate(userId,{cartData})

       res.json({success:true,message:'added to cart'})
    } catch (error) {
       
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//update user cart
const updateQuantity = async (req,res)=>{

      try {
        
        const {userId,itemId, size,quantity} = req.body
       
       const usreData = await userModel.findById(userId)
       const cartData = await usreData.cartData

        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:'cart Updated'})


      } catch (error) {

        console.log(error);
        res.json({success:false,message:error.message})
        
      }
}


//get user cart data
const getUserCart = async (req,res)=>{

    try {
        const {userId}=req.body

        const usreData = await userModel.findById(userId)
       const cartData = await usreData.cartData

        res.json({success:true,cartData})
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

export {updateQuantity,addToCart,getUserCart}