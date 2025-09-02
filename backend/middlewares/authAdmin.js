import jwt from 'jsonwebtoken'
const authAdmin=async(req,res,next)=>{
    try{
        // atoken stands for admin token
        const{atoken}=req.headers;
        if(!atoken) {
            return res.json({success:false,message:"Not authorize login again"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);
        if(token_decode.email!==process.env.ADMIN_EMAIL) {
            return res.json({success:false,message:"Noth authorize login again"})
        }
        next();
    }
    catch(error) {
        console.log(error)
        res.json({sucess:false,message:error.message})
    }
}
export default authAdmin