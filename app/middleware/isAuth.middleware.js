const jwt = require('jsonwebtoken');
const isAuth = async (req, res, next) => {
    let {
        token
    } = req.cookies;
    if (token) {
        try {
           let data =await jwt.verify(token, "e42f16cd-194d-46a3-a40a-4c8c2ac04d79");
           req.session.user = data;
            req.session.isAuth = true;

        } catch (error) {
            req.session.isAuth = false;
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