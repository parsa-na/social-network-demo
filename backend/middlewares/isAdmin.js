const isAdmin=(req,res,next)=>{
    if(req.user.role=='ADMIN'){
        next();
    }
    else{
        return res.status(403).send({
            msg:'you don\'t have permission'
        })
    }
}
module.exports=isAdmin;