const jwt=require('jsonwebtoken')

const authUser=async(req,res,next)=>{
    try {
        
        


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

module.exports=authUser