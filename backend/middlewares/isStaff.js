const isStaff=(req,res,next)=>{
    if(req.user.role=='ADMIN' || req.user.role=='STAFF'){
        next();
    }
    else{
        return res.status(403).send({
            msg:'you don\'t have permission'
        })
    }
}
module.exports=isStaff;