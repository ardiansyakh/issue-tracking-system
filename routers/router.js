const router = require('express').Router()
const roleRouter = require('./roleRouter')
const categoryRouter = require('./categoryRouter')
const employeeRouter = require('./employeeRouter')
const issueRouter = require('./issueRouter')
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.home)
router.use('/roles', roleRouter)
router.use('/categories', categoryRouter)
router.use('/employees', employeeRouter)
router.use('/issues', issueRouter)

module.exports = router