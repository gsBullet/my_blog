module.exports = (req,res,server) =>{
    if(res.session.isAuth === true){
        server.locals.checkIsAuth = true;
        server.locals.user = res.session.user;
    }else{
        server.locals.checkIsAuth = false;
        server.locals.user = {};
    }

}

