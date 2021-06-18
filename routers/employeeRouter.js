const employeeController = require('../controllers/employeeController')
const checkSessionAuth = require('../helpers/checkSessionAuth')

const router = require('express').Router() 
router.get('/', checkSessionAuth, employeeController.readAll) // checkSessionAuth,
router.post('/add', checkSessionAuth, employeeController.addPost)
router.get('/edit/:id', checkSessionAuth, employeeController.editForm)
router.post('/edit/:id', checkSessionAuth, employeeController.editPost)
router.get('/delete/:id', checkSessionAuth, employeeController.delete)

module.exports = router