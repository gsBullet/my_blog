
const isAuth = (req,res,next)=>{
    console.log(req);
    if(req.session.isAuth){
        next();
    }
    else{
        req.session.prev_auth_url = req.originalUrl;
        res.redirect('/login')
    }
}

module.exports =()=>isAuth