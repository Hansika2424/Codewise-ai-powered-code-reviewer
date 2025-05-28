const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const app = express() // -> new instance (server) created when express() is called

app.use(cors())
app.use(express.json())
//test route 
app.get('/', (req,res)=>{ // here route is  -> /
    res.send("Hello World")
})

app.use('/ai', aiRoutes)
//export app
module.exports = app

 