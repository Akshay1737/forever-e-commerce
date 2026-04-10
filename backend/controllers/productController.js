import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";
//fucnction for add product 
const addProduct = async (req, res) => {
    try{
        if (
            !process.env.CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return res.status(500).json({
                success: false,
                message:
                    "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env"
            });
        }

        const {
            name,
            description,
            price,
            category,
            subCategory,
            sucCategory,
            sizes,
            bestseller,
            bestSeller
        } = req.body;
        const image1 = req.files?.image1?.[0];  
        const image2 = req.files?.image2?.[0];  
        const image3 = req.files?.image3?.[0];  
        const image4 = req.files?.image4?.[0]; 
        const images = [image1, image2, image3, image4].filter((item)=>item!== undefined); 

        if (!images.length) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required"
            });
        }
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )
        console.log("Image URLs:", imagesUrl);
        const normalizedSubCategory = subCategory || sucCategory;
        const rawBestseller = bestseller ?? bestSeller;
        const normalizedBestseller =
            rawBestseller === true || rawBestseller === "true";

        let parsedSizes = [];
        if (Array.isArray(sizes)) {
            parsedSizes = sizes;
        } else if (typeof sizes === "string" && sizes.trim()) {
            parsedSizes = JSON.parse(sizes);
        }

        console.log(
            name,
            description,
            price,
            category,
            normalizedSubCategory,
            parsedSizes,
            normalizedBestseller
        );
        console.log(image1, image2, image3, image4);
        

         const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory: normalizedSubCategory,
            sizes: parsedSizes,
            bestseller: normalizedBestseller,
            image: imagesUrl,
            date:Date.now()
        };
        console.log("Product Data:", productData);

        const product = new productModel(productData);
        await product.save();
         res.json({success:true, message: "Product added successfully", product: productData });
    }catch(error){
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Error adding product", error: error.message });    


    }

}


//function for list product 
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({success:true, products});

    }catch(error){
        console.error("Error listing products:", error);
        res.status(500).json({ message: "Error listing products", error: error.message });
    }
}//removing product 
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Product removed successfully"});

    }catch(error){
        console.error("Error removing product:", error);
        res.status(500).json({ message: "Error removing product", error: error.message });
    }
}

//fuction for single product info 
const singleProduct =async (req, res) => {

    try{
        const {productId} =req.body;
        const product =await productModel.findById(productId);
        res.json({success:true, product});
    }catch(error){
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }

}



export {addProduct, listProducts, removeProduct, singleProduct};
