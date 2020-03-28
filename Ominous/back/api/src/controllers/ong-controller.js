const crypto = require('crypto')

const db = require('../database/connection')

module.exports = {
    async getAll(request, response) {
        const ongs = await db('ongs').select('*')
        return response.json(ongs);
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
        const id = crypto.randomBytes(4).toString('HEX')

        console.log('inserting now...')
        await db('ongs').insert({ id, name, email, whatsapp, city, uf })

        console.log('responding now...')
        return response.json({ id })
    }
}