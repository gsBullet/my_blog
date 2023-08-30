const express = require('express');
const server = express();
const port = 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/all.routes');
const checkAuthMiddleware = require('./app/middleware/checkAuth.middleware');
const mongoose = require('mongoose');
server.set('json spaces', 4);


// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
server.use(bodyParser.json())

server.set('trust proxy', 1) // trust first proxy
server.use(session({
    secret: 's3Cur3',
    name: 'session1'
}));



server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('public'));

server.use((req, res, next) => {
    server.locals.error={};
    server.locals.old ={};
    if(req.session.error){
        server.locals.error = req.session.error;
        req.session.error={};
    }
    if(req.session.old){
        server.locals.old = req.session.old;
        req.session.old={};
    }
    // server.locals.error = req.session.error;
    checkAuthMiddleware(server,req,res,next);
    next();
})


// routes 

server.use(allRoutes());




mongoose.connect("mongodb+srv://my_blog_database:85OmFwUrmMZXcFzf@cluster0.dqs42jv.mongodb.net/blogDb")
.then(()=>{
    // console.log('mongoose is connect');
    server.listen(port, () => {
        console.log(`mongoose is listening on http://127.0.0.1:${port}`)
    })
});