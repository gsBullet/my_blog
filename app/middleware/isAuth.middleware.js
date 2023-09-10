const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
    let {
        token
    } = req.cookies;
    if (token) {
        try {
            jwt.verify(token, "e42f16cd-194d-46a3-a40a-4c8c2ac04d79");
            req.session.isAuth = true

        } catch (error) {
            req.session.isAuth = true
        }

    }
    if (req.session.isAuth) {
        next();
    } else {
        if (/^[^.]*$/.test(req.originalUrl)) {
            req.session.prev_auth_url = req.originalUrl;
        }
        res.redirect('/login')
    }
}

module.exports = () => isAuth