const db = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { id } = request.body

        if (!id) {
            return response.status(400).json({ error: 'Missing required parameter id' })
        }

        const ong = await db('ongs').where({ id }).select('name').first()

        if (!ong) {
            return response.status(400).json({ error: 'No ONG was found with the provided ID' })
        }

        return response.json(ong)
    }
}