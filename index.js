const DataStore = require('./datastore.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

let myDataBase = new DataStore('mongodb://localhost:27017', 'notebook', 'entries')

app.use(express.static('.'))
app.use(bodyParser())
app.get('/posts', getEntries)
app.post('/posts', insertNote)

async function getEntries (req, res) {
    let items = await myDataBase.getAll()
    res.type('application/json').send(JSON.stringify(items))
    //console.log(items)
    //res.type('application/json').send(JSON.stringify(items));
}

async function getOne () {
    let item = await myDataBase.getOne('5e795be322d12b17e4e75298')
    //console.log(item)
}

async function insertNote (req, res) {
    console.log(req)
    let date = new Date().toDateString()
    let name = req.body.name
    let content = req.body.message
    await myDataBase.insert({date: date, name: name, content: content});
    res.redirect('/')
}

async function deleteOne () {
    await myDataBase.delete('5e7a7969e925f572c86963ac')
}

async function updateNote () {
    let update = {
        content: "The wold is still mine!!!!!"
    }
    await myDataBase.update('5e7a7a00b05f4576e034f216', update)
}

app.listen(process.env.PORT || 3000, console.log('listening for requests!'))