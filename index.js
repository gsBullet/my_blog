const express = require('express');
const server = express();
const port = 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/all.routes');
// const websiteRouter = require('./routes/partials/website.router');
// const router = express.Router()

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
}))
server.locals.checkIsAuth = false;


server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('public'));


// routes 
server.post('/login-submit', (req, res) => {

    req.session.isAuth = true;
    server.locals.checkIsAuth = true;
    // let preUrl = req.session.prev_auth_url;
    // if (preUrl) {
    //     delete req.session.prev_auth_url;
    //     return res.redirect(preUrl)
    // }
    res.redirect('/dashboard')
})

server.use(allRoutes())



server.listen(port, () => {
    console.log(`app is listening on http://127.0.0.1:${port}`)
})