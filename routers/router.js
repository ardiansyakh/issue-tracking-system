const router = require('express').Router()
const roleRouter = require('./roleRouter')
const categoryRouter = require('./categoryRouter')
const employeeRouter = require('./employeeRouter')
const issueRouter = require('./issueRouter')
const loginRouter = require('./loginRouter')
const HomeController = require('../controllers/HomeController')
const checkSession = require('../helpers/checkSession')
const LoginController = require('../controllers/loginController')

router.get('/', HomeController.home)
router.use('/roles', checkSession, roleRouter)
router.use('/categories', checkSession, categoryRouter)
router.use('/employees', employeeRouter) //checkSession
router.use('/issues', issueRouter)//checkSession, 
router.use('/login', loginRouter)
router.use('/logout', LoginController.logout)

module.exports = router