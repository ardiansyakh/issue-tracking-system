const employeeRouter = require('./employeeRouter')
const router = require('express').Router()

// router.get('/', dashboardController.home)
router.use('/employee', employeeRouter)

module.exports = router