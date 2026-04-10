import jwt from "jsonwebtoken";

const adminAuth =async (req, res, next) => {
    try{
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message:"Token is required"}   );

        }
        const token_decode= jwt.verify (token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Invalid admin token"});
        }
        next();

    }catch(error){
        console.error("Error in admin authentication:", error);
        res.status(500).json({ message: "Error in admin authentication", error: error.message });
    }


}
export default adminAuth;