//@ts-nocheck
const express = require('express')
const { Request, Response } = require("express");
const path = require("path")
const fs = require("fs")
const Logger = require('./utils/logger')
const constants = require('./constants');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ! Censor the API Key if it's provided
app.use((req, res, next) => {
    let querykey
    let bodykey
    if (req.path === '/log') return next()
    if (req.body.apikey) {
        bodykey = req.body.apikey
        req.body.apikey = "Censored for Privacy"
    }
    if (req.query.apikey) {
        querykey = req.query.apikey
        req.query.apikey = "Censored for Privacy"
    }
    let query = req.query
    let body = req.body
    Logger.info(`[ ${new Date().toLocaleString()} ]`, {
        path: req.path,
        query, body,
        useragent: req.get('User-Agent')
    })
    req.query.apikey = querykey
    req.body.apikey = bodykey
    next()
})
// ! Redirect to configured redirect site (Killswitch Wiki by Default)
app.get('/', (req, res) => {
    res.redirect(constants.redirect)
})

// ! Route Imports
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    let r = []
    files.forEach(file => {
        if (file.endsWith("js")) return;
        let pathstring = path.join(__dirname, "routes", file)
        let route = require(pathstring)
        r.push(route)
    })
    r.forEach(route => {
        app.use(route.paths, route.handler)
    })
})

// ! Provide App Log if wanted (main file by default, erorr if passed ?error=true)
//app.get("/log", (req, res) => {
//    fs.readFile(`${req.query.error ? constants.error : constants.log}`, 'utf8', function (err, data) {
//        if (err) throw err;
//        res.set({ 'Content-Type': 'text/plain' })
//        return res.send(data);
//   })
//})

app.listen(constants.port, () => Logger.info(`Listening on port ${constants.port}`))

module.exports = app
