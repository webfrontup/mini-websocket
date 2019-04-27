const express = require('express')
const path = require('path')
const app = express()
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname,'index.html'))
})
app.get('/clock', function(req, res) {
    res.end(new Date().toLocaleString())
})
app.get('/clock2', function (req, res) {
    setTimeout(function(){
        res.end(new Date().toLocaleString());
    }, 5 * 1000);
})

app.listen(8080)