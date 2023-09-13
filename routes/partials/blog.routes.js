const express = require('express')
const blogController = require('../../app/controller/backend/blog.controller')
const router = express.Router()

router
    .get('/dashboard/blog/create', blogController.create)
    .post('/dashboard/blog/create', blogController.store)
    .get('/dashboard/blog/:id/edit', blogController.edit)
    .get('/dashboard/blog/:id', blogController.show)

    .get('/dashboard/blog',blogController.all)


module.exports = () => router