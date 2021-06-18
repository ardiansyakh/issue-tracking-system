const router = require('express').Router()
const IssueController = require('../controllers/IssueController')
const IssueControllerEmployee = require('../controllers/IssueControllerEmployee')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/issueUser/track', IssueController.trackIssueUser)
router.post('/issueUser/track', IssueController.trackIssueUserPost)
router.get('/issueUser/add', IssueController.addIssueUser)
router.post('/issueUser/add', IssueController.addIssueUserPost)
router.get('/issueUser/detail/:id', IssueController.detailIssueUser)
router.get('/download/:filename', IssueController.downloadFile)


router.get('/issueEmployee', IssueControllerEmployee.listIssue)
router.get('/issueEmployee/edit/:id', IssueControllerEmployee.editIssue)
router.post('/issueEmployee/edit/:id', IssueControllerEmployee.editIssuePost)

module.exports = router