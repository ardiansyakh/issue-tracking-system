const router = require('express').Router()
const IssueController = require('../controllers/IssueController')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkSession = require('../helpers/checkSession');

//Issue Employee
router.get('/', checkSession, IssueController.listIssue)
router.get('/edit/:id',checkSession, IssueController.editIssue)
router.post('/edit/:id',checkSession, IssueController.editIssuePost)


//Issue User
router.get('/issueUser/track', IssueController.trackIssueUser)
router.post('/issueUser/track', IssueController.trackIssueUserPost)
router.get('/issueUser/add', IssueController.addIssueUser)
router.post('/issueUser/add', IssueController.addIssueUserPost)
router.get('/issueUser/detail/:id', IssueController.detailIssueUser)
router.get('/download/:filename', IssueController.downloadFile)

module.exports = router