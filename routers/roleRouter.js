const router = require('express').Router()
const RoleController = require('../controllers/RoleController')

router.get('/', RoleController.listRole)
router.get('/:id', RoleController.listRoleUser)

module.exports = router