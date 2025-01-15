const successController = async(res,{
    statusCode=200,
    payload={},
    message='ধন্যবাদ ',
    sendFrom='response controller'
})=>{


    return res.status(statusCode).json({
        payload,message,sendFrom
    })
}

module.exports = {
    successController
}