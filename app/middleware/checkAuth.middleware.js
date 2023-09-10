const jwt = require('jsonwebtoken');

module.exports = (req, res, server) => {
    var {
        token
    } = res.cookies;
    if (token) {
        try {
            let decode = jwt.verify(token, "e42f16cd-194d-46a3-a40a-4c8c2ac04d79");
            server.locals.checkIsAuth = true;
            server.locals.user = decode;
        } catch (error) {
            server.locals.checkIsAuth = false;
            server.locals.user = {};
            console.log(error);
        }

    } else {
        server.locals.checkIsAuth = false;
        server.locals.user = {};
    }

}