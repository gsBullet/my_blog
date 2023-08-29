const express = require('express');
const router = express.Router();
const blogRoutes = require('./partials/blog.routes')
const dahsboardRoutes = require('./partials/dahsboard.routes')
const authRoutes = require('./partials/auth.routes')
const websiteRouter = require('./partials/website.routes');
const userRoutes = require('./partials/user.routes');




router.use(websiteRouter());
router.use(authRoutes());
router.use(dahsboardRoutes());
router.use(blogRoutes());
router.use(userRoutes());

module.exports = () => router