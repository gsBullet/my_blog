const express = require('express');
const server = express();
const port = 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/all.routes');
const checkAuthMiddleware = require('./app/middleware/checkAuth.middleware');
const mongoose = require('mongoose');
const db_url = require('./config/db.config');
const cookieParser = require('cookie-parser');
server.use(cookieParser());
server.set('json spaces', 4);
const formData = require('express-form-data');



// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
server.use(bodyParser.json())
server.use(formData.parse());
server.set('trust proxy', 1) // trust first proxy
server.use(session({
    secret: 's3Cur3',
    name: 'session1'
}));



server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('public'));

server.use((req, res, next) => {
    // console.log(req);
    server.locals.error={};
    server.locals.old ={};
    server.locals.old_body ={};
    if(req.session.error){
        server.locals.error = req.session.error;
        req.session.error={};
    }
    if(req.session.old){
        server.locals.old = req.session.old;
        req.session.old={};
    }
    if(req.session.old_body){
        server.locals.old_body = req.session.old_body;
        req.session.old={};
    }
    // server.locals.error = req.session.error;
    checkAuthMiddleware(server,req,res,next);
    next();
})


// routes 

server.use(allRoutes());




mongoose.connect(db_url)
.then(()=>{
    // console.log('mongoose is connect');
    server.listen(port, () => {
        console.log(`mongoose is listening on http://127.0.0.1:${port}`)
    })
});

