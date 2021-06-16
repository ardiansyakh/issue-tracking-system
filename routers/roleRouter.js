const router = require('express').Router()
const RoleController = require('../controllers/RoleController')
const checkSessionAuth = require('../helper/checkSessionAuth')

router.get('/', checkSessionAuth, RoleController.listRole)
router.get('/:id', checkSessionAuth, RoleController.listRoleUser)

module.exports = router