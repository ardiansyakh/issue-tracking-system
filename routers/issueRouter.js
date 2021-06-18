const router = require('express').Router()
const IssueController = require('../controllers/IssueController')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/issueUser', IssueController.listIssueUser)
router.get('/issueUser/add', IssueController.addIssueUser)
router.post('/issueUser/add', IssueController.addIssueUserPost)
router.get('/issueUser/detail/:id', IssueController.detailIssueUser)
router.get('/download/:filename', IssueController.downloadFile)


router.get('/issueUser/edit/:id', IssueController.editIssueUser)
router.post('/issueUser/edit/:id', IssueController.editIssueUserPost)

router.get('/', IssueController.listIssue)
router.post('/', IssueController.listIssuePost)
router.get('/edit/:id', IssueController.editIssue)
router.post('/edit/:id', IssueController.editIssuePost)
router.get('/delete/:id', IssueController.deleteIssue)

module.exports = router