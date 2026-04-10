import jwt from "jsonwebtoken"

const authUser = async (req ,res , next ) =>{
    const {token }=req.headers;
    if (!token){
        return res.json({success:false ,message :"Not Authorised "})
    }
    try{
        const token_decode = jwt.verify(token ,process.env.JWT_SECRET)
        req.body.userId =token_decode.id 
        next()

    }catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again."
            })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            })
        }
        console.log(error)
        res.status(500).json({success:false , message:error.message})

    }
}

export default authUser;
