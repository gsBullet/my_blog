const express = require('express')
const router = express.Router()

router
    .get('/', (req, res) => {
        return res.render('home')
    })

    .get('/about', (req, res) => {
        return res.render('about')
    })

    .get('/login', (req, res) => {
        return res.render('auth/login')
    })

    .get('/contact', (req, res) => {
        return res.render('contact')
    });

module.exports = () => router