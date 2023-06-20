const router = require('express').Router()

const items = require('../../infraestructura/routes/items/items.routes')

router.use('/items', items)

module.exports = router