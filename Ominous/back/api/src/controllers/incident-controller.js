const db = require('../database/connection')

const PAGE_SIZE = 5

module.exports = {
    async getAll(request, response) {
        const { page = 1 } = request.query

        const data = await db('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(PAGE_SIZE)
            .offset((page - 1) * PAGE_SIZE)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        const [count] = await db('incidents').count()

        response.header('X-Total-Count', count['count(*)'])
        return response.json(data)
    },
    async getById(request, response) {
        const { id } = request.params
        console.log(id)
        const data = await db('incidents').where({ id }).select('*').first()
        return response.json(data)
    },
    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await db('incidents').insert({ title, description, value, ong_id })

        return response.json({ id })
    },
    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        if (!ong_id) {
            return response.status(401).json({ error: 'Must authenticate to perform this action' })
        }

        const incident = await db('incidents').where({ id }).select('ong_id').first()

        if ((incident && incident.ong_id !== ong_id)) {
            return response.status(403).json({ error: 'Missing required permissions for this operation' })
        }

        await db('incidents').where({ id }).delete()

        return response.status(204).send()
    }
}