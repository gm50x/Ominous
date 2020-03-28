const express = require('express')

const ongs = require('./controllers/ong-controller')
const incidents = require('./controllers/incident-controller')
const profiles = require('./controllers/profile-controller')
const sessions = require('./controllers/session-controller')

const routes = express.Router()

// routes.get('/ongs', async (request, response) => {
//     const ongs = await db('ongs').select('*')
//     return response.json(ongs)
// })

routes.get('/ongs', ongs.getAll)
routes.post('/ongs', ongs.create)

routes.get('/incidents', incidents.getAll)
routes.get('/incidents/:id', incidents.getById)
routes.post('/incidents', incidents.create)
routes.delete('/incidents/:id', incidents.delete)

routes.get('/profiles', profiles.getAllIncidentsByOng)

routes.post('/sessions', sessions.create)

module.exports = routes