const router = require('express').Router()
const roleRouter = require('./roleRouter')
const categoryRouter = require('./categoryRouter')
const employeeRouter = require('./employeeRouter')
const issueRouter = require('./issueRouter')
const loginRouter = require('./loginRouter')
const HomeController = require('../controllers/HomeController')
const LoginController = require('../controllers/loginController')
const checkSession = require('../helpers/checkSession')

router.get('/', HomeController.home)
router.use('/roles', checkSession, roleRouter)
router.use('/categories', checkSession, categoryRouter)
router.use('/employees',checkSession, employeeRouter)
router.use('/issues', issueRouter)
router.use('/login', loginRouter)
router.use('/logout',checkSession, LoginController.logout)

module.exports = router