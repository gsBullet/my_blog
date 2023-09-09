const express = require('express')
const categoryController  = require('../../app/controller/backend/category.controller')
const router = express.Router()

router
    .get('/dashboard/category/create',categoryController.create)
    .post('/dashboard/category/create',categoryController.store)
    .get('/dashboard/category',categoryController.all)
    .post('/dashboard/category/export-info',categoryController.export_info)

    .get('/dashboard/category/:id/edit',categoryController.edit)
    .post('/dashboard/category/:id/edit',categoryController.update)
    .get('/dashboard/category/:id/delete',categoryController.delete)
    .get('/dashboard/category/:id', categoryController.show)



module.exports = () => router