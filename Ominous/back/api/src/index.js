const express = require('express')
const express = require('cors')

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(8000)