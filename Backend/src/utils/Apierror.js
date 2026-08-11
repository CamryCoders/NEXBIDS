class ApiError extends Error{
    constructor(
        statusCode,
        
        message,
        error=[]

    ){
        super(message)
this.statusCode=statusCode,
this.error=error
this.message=message
this.data=null
this.errors=error


    }
}
export {ApiError}