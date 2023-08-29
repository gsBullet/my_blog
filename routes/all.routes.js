const express = require('express');
const router = express.Router();
const blogRoutes = require('./partials/blog.routes')
const dahsboardRoutes = require('./partials/dahsboard.routes')
const authRoutes = require('./partials/auth.routes')
const websiteRouter = require('./partials/website.routes');
const isAuthMiddleware = require('../app/middleware/isAuth.middleware');



router
    .use(websiteRouter())
    .use(isAuthMiddleware())
    .use(authRoutes())
    .use(blogRoutes())
    .use(dahsboardRoutes());

module.exports = () => router