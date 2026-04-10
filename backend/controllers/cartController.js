import userModel from "../models/userModel.js"

// add products to user cart 
const addTOCart = async (req,res) => {
   try {
    const {userId ,itemId,size} = req.body
    const userData = await userModel.findById(userId)
    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
        cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
    } else {
        cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json ({success:true , message:"Added To Cart"});

   }catch(error){
    console.log(error)
     res.json ({success:false , message:error.message});

   }
    
}
//update user cart 
const updateCart = async (req,res) => {
    try{
        const {userId ,itemId,size ,quantity} = req.body
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size]=quantity
         await userModel.findByIdAndUpdate(userId,{cartData})
         res.json ({success:true , message:"updated To Cart"});

    }catch(error){
          console.log(error)
     res.json ({success:false , message:error.message});

    }

}

//get user cart data

const  getUserCart= async (req,res) => {
    try{
        const {userId } = req.body
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData || {};
        res.json({success:true ,cartData})

    }catch(error){
           console.log(error)
     res.json ({success:false , message:error.message});
    }

}

export {getUserCart ,addTOCart ,updateCart}
