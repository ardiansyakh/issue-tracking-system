const employeeController = require('../controllers/employeeController')

const router = require('express').Router()
router.get('/', employeeController.readAll)
router.get('/add', employeeController.addForm)
router.post('/add', employeeController.addPost)
router.get('/edit/:id', employeeController.editForm)
router.post('/edit/:id', employeeController.editPost)
router.get('/delete/:id', employeeController.delete)

module.exports = router