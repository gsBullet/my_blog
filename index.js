const express = require('express');
const server = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const port = 5000;

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 's3Cur3',
  name: 'session1'
}))
 server.locals.checkIsAuth = false;

const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/login')
    }
}

server.set('view engine','ejs');
server.set('views','./views');
server.use(express.static('public'));

server.get('/', (req, res)=>{
    return res.render('home')
})
server.get('/about', (req, res)=>{
    return res.render('about')
})
server.get('/login', (req, res)=>{
    return res.render('auth/login')
})
server.post('/login-submit', (req, res)=>{
   
    req.session.isAuth= true;
    server.locals.checkIsAuth = true;
    res.redirect('/dashboard')
})
server.get('/dashboard',isAuth, (req, res)=>{
    console.log(req.session);
    return res.render('backend/dashboard')
})
server.get('/dashboard/create_blog', isAuth,(req, res)=>{
    return res.render('backend/create-blog')
})
server.get('/logout',isAuth, (req, res)=>{
    req.session.isAuth= false;
    server.locals.checkIsAuth = false;
    return res.redirect('/')
})
server.get('/contact', (req, res)=>{
    return res.render('contact')
})



server.listen(port,()=>{
    console.log(`app is listening on http://127.0.0.1:${port}`)
})