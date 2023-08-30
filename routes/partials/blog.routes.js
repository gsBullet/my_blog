const express = require('express')
const router = express.Router()

router
    .get('/dashboard/blog/create', (req, res) => {
        return res.render('backend/blog_management/create_blog')
    })
    .get('/dashboard/blog/:id/edit', (req, res) => {
        return res.render('backend/blog_management/edit')
    })
    .get('/dashboard/blog/:id', (req, res) => {
        return res.render('backend/blog_management/show')
    })

    .get('/dashboard/blog', (req, res) => {
        return res.render('backend/blog_management/all')
    })


module.exports = () => router