const db = require('../database/connection')

module.exports = {
    async getAllIncidentsByOng(request, response) {
        const { ong_id } = request.query

        if (!ong_id) {
            return response.status(400).json({ error: 'Missing query parameter: ong_id' })
        }

        const data = await db('incidents').where({ ong_id }).select('*')
        return response.json(data);
    }
}