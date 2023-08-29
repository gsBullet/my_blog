module.exports = (req,res,server) =>{
    if(res.session.isAuth === true){
        server.locals.checkIsAuth = true;
    }else{
        server.locals.checkIsAuth = false;
    }

}

