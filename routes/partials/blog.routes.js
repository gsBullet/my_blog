const express = require('express')
const blogController = require('../../app/controller/backend/blog.controller')
const router = express.Router()

router
    .get('/dashboard/blog/create', blogController.create)
    .post('/dashboard/blog/create', blogController.store)
    .get('/dashboard/blog', blogController.all)
    .post('/dashboard/blog/export-info', blogController.export_info)
    .post('/dashboard/blog/delete-by-id', blogController.delete_by_ids)
    .post('/dashboard/blog/update-status', blogController.update_status)

    .get('/dashboard/blog/:id/edit', blogController.edit)
    .post('/dashboard/blog/:id/edit', blogController.update)
    .get('/dashboard/blog/:id/delete', blogController.delete)
    .get('/dashboard/blog/:id', blogController.show)



module.exports = () => router