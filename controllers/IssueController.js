const { issue, category, employee, assignment } = require('../models')
const generateRandomString = require('../helpers/generateRandomString')
const checkFileType = require('../helpers/checkFileType')

const moment = require('moment')
const multer = require('multer')
const path = require('path')


//set storage engine
const myStorage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init upload
const upload = multer({
    storage: myStorage,
    limits: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('myFile')
//  .array('files')


class IssueController {
    //issue user
    static trackIssueUser(req, res) {
        let { notif, email } = req.query
        res.render('trackIssueUser', { notif: notif, email: email })
    }

    static trackIssueUserPost(req, res) {
        let { issue_user_client_email } = req.body
        let { notif, email } = req.query

        issue_user_client_email = issue_user_client_email ? issue_user_client_email : email

        issue.findAll({
            where: {
                issue_user_client_email: issue_user_client_email
            },
            include: [
                {
                    model: assignment,
                    include: [
                        {
                            model: employee
                        }],
                    required: false
                },
                {
                    model: category
                }
            ],
            required: false,
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                //res.send(result)
                res.render('issueUser', { data: result, notif: notif, moment: moment })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listIssueUser(req, res) {
        
        let { notif } = req.query

        issue.findAll({
            include: category,
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                //res.send(result)
                res.render('issueUser', { data: result, notif: notif, moment: moment })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static detailIssueUser(req, res) {
        let { id } = req.params
        issue.findOne({
            where: {
                id: +id
            },
            include: [
                {
                    model: assignment,
                    include: [
                        {
                            model: employee
                        }],
                    required: false
                },
                {
                    model: category
                }
            ],
            required: false,
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                //res.send(result)
                res.render('viewIssueUser', { data: result, moment: moment })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static downloadFile(req, res) {
        let { filename } = req.params
        let { status } = req.query
        console.log(filename);
        if (filename !== 'null') {
            console.log('masuuuuk');
            let path = './public/uploads/' + filename;
            res.download(path)
        } else {
            res.send('no attachement found in this issue')
        }
    }

    static addIssueUser(req, res) {
        const { notif } = req.query
        category.findAll()
            .then(result => {
                res.render('addIssueUser', { category: result, notif: notif })
            })
            .catch(err => {
                res.send(err)
            })
    }


    static addIssueUserPost(req, res) {
        upload(req, res, (err) => {
            if (err) {
                res.render('index', { msg: err })
            } else {
                if (req.file === undefined) {    //untuk handle file kosong tidak dipilih
                    res.render('addIssueUser', { category: result, notif: 'Error: No file selected' })
                } else {
                    const { issue_user_client_name, issue_user_client_email, issue_subject, issue_category, issue_desc, myFile } = req.body
                    let issue_category_id = issue_category
                    let issue_status = 'Open'
                    let issue_ticket_number = generateRandomString(8)
                    let issue_attachment_filename = req.file.filename

                    let categories
                    let employees

                    category.findAll()
                    .then(result => {
                        categories = result
                        return employee.findAll()
                    })

                    .then(result=>{
                        employees = result
                        return issue.create({
                            issue_user_client_name, issue_user_client_email, issue_subject, issue_desc,
                            issue_status, issue_ticket_number, issue_attachment_filename, issue_category_id
                        })
                    })

                    .then(result => {
                        issue_ticket_number = result.issue_ticket_number
                        const index = Math.round(Math.random()*employees.length)
                        const assignment_employee_id = employees[index].id
                        return assignment.create({assignment_issue_id: result.id, assignment_employee_id})
                    })

                    .then(result=>{
                        let notif = `Successfully created issue with ticket number "${issue_ticket_number}"`
                        res.redirect(`/issues/issueUser/track?notif=${notif}`)
                    })

                    .catch(err => {
                        res.send(err)
                    })
                }
            }
        })
    }


    //issue employee
    static listIssue(req, res) {
        let { notif } = req.query
        issue.findAll({
            order: [ ['id', 'DESC'], [assignment, 'id', 'DESC'], ],
            include: [category, 
                {model: assignment,
                    include: [{
                        model: employee,
                        attributes: ['employee_first_name']
                    }]
                }
            ]
        })
        .then(result => {
            res.render('listIssue', { data: result, notif: notif, moment: moment })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editIssue(req, res) {
        let { id } = req.params
        const {notif} = req.query
        const status = ['Open', 'On Progress', 'Resolve', 'Reject']
        let categories
        let employees
        category.findAll()
        .then(result=>{
            categories = result
            return employee.findAll()
        })
        .then(result=>{
            employees = result
            return issue.findOne({
                where: {
                    id: +id
                },
                include: [
                    {
                        model: assignment,
                        order:[ ['id', 'desc'] ],
                        include: [
                            {
                                model: employee
                            }],
                        required: false
                    },
                    {
                        model: category
                    }
                ],
                required: false,
                order: [
                    [assignment, 'id', 'DESC'],
                ]
            })
        })
        .then(result => {
            res.render('editIssue', { data: result, moment: moment, employees, categories, status, notif})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editIssuePost(req, res) {
        const { id } = req.params
        const {issue_category, issue_status, assignment_employee_id} = req.body
        let employee_id_before = false

        issue.update({issue_category, issue_status},{
            where: {id:+id},
            returning: true
        })
        .then(result=>{
            return assignment.findAll({
                where: {assignment_issue_id: id}
            })
        })
        .then(result=>{
            return result.forEach(assignment => {
                if(assignment.assignment_employee_id === +assignment_employee_id){
                    employee_id_before = true
                }
            });
        })
        .then(result=>{
            if(!employee_id_before){
                return assignment.create ({assignment_issue_id: +id, assignment_employee_id})
            }
        })
        .then(result=>{
            const notif = 'Success Update'
            res.redirect(`/issues/edit/${id}?notif=${notif}`)
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = IssueController