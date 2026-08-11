const errorHandler=async(err,req,res,next)=>{
    res.status(err.statusCode||500).json({
        statusCode:err.statusCode||500,
        message:err.message|| "Internal Server error",
        error:err.errors ||[]

    })
}

export {errorHandler}