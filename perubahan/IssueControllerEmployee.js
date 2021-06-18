const { issue, category, assignment, employee } = require('../models')
const generateRandomString = require('../helpers/generateRandomString')
const checkFileType = require('../helpers/checkFileType')

const moment = require('moment')
const multer = require('multer')
const path = require('path')
const assignments = require('../models/assignments')


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



class IssueController {
    static trackIssueUser(req, res) {
        let { notif, email } = req.query
        res.render('trackIssueUser', { notif: notif, email: email })
    }

    static trackIssueUserPost(req, res) {
        let { issue_user_client_email } = req.body
        let { notif, email } = req.query
        console.log(email);

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

    static detailIssueUser(req, res) {
        let { id } = req.params
        let session = req.session.employee_username
        console.log(session);
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

                        .then(result => {
                            employees = result
                            return issue.create({
                                issue_user_client_name, issue_user_client_email, issue_subject, issue_desc,
                                issue_status, issue_ticket_number, issue_attachment_filename, issue_category_id
                            })
                        })

                        .then(result => {
                            let issue_category_id = issue_category
                            let issue_status = 'Open'
                            let issue_ticket_number = generateRandomString(8)
                            let issue_attachment_filename = req.file.filename

                            if (req.file === undefined) {    //untuk handle file kosong tidak dipilih
                                res.render('addIssueUser', { category: result, notif: 'Error: No file selected' })
                            } else {
                                issue.create({
                                    issue_user_client_name, issue_user_client_email, issue_subject, issue_desc,
                                    issue_status, issue_ticket_number, issue_attachment_filename, issue_category_id
                                })
                                    .then(result2 => {
                                        //res.send(result2)
                                        let notif = `Successfully created issue with ticket number "${result2.dataValues.issue_ticket_number}. Please enter your email address to track your issue ticket."`
                                        res.redirect(`/issues/issueUser/track?notif=${notif}&email=${issue_user_client_email}`)
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            }
                            issue_ticket_number = result.issue_ticket_number
                            const index = Math.round(Math.random() * employees.length)
                            const assignment_employee_id = employees[index].id
                            console.log(assignment_employee_id);
                            return assignment.create({ assignment_issue_id: result.id, assignment_employee_id })
                        })

                        .then(result => {
                            let notif = `Successfully created issue with ticket number "${issue_ticket_number}"`
                            res.redirect(`/issues/issueUser?notif=${notif}`)
                        })

                        .catch(err => {
                            res.send(err)
                        })
                }
            }
        })
    }


    static editIssueUser(req, res) {

    }
    static editIssueUserPost(req, res) {

    }

    static listIssue(req, res) {
        let { notif } = req.query

        issue.findAll({
            include: [category,
                {
                    model: assignment,
                    include: [{
                        model: employee,
                        attributes: ['employee_first_name']
                    }]
                }
            ],
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                console.log(result[0].assignments[0].employee.employee_first_name)
                res.render('listIssue', { data: result, notif: notif, moment: moment })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listIssuePost(req, res) {
        // const { Issue_name } = req.body

        // Issue.create({ Issue_name })
        //     .then(result => {
        //         //console.log(result);
        //         let notif = `Successfully added issue "${result.dataValues.Issue_name}"`
        //         res.redirect(`/categories?notif=${notif}`)
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
    }

    static editIssue(req, res) {
        // const { id } = req.params
        // let { notif } = req.query

        // Issue.findOne({
        //     where: { id: +id }
        // })
        //     .then((result) => {
        //         res.render('editIssue', { data: result, notif: notif })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
    }

    static editIssuePost(req, res) {
        // const { id } = req.params
        // const { Issue_name } = req.body

        // Issue.update(
        //     { Issue_name },
        //     {
        //         where: { id: +id },
        //         returning: true
        //     })
        //     .then(result => {
        //         let notif = `Successfully updated issue "${result[1][0].dataValues.Issue_name}"`
        //         res.redirect(`/categories?notif=${notif}`)
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
    }

    static deleteIssue(req, res) {
        // const { id } = req.params

        // Issue.findOne({
        //     where: { id: +id }
        // })
        //     .then((result) => {
        //         return Issue.destroy({
        //             where: { id: +id }
        //         })
        //             .then((result2) => {
        //                 let notif = `Successfully deleted issue ${result.dataValues.Issue_name}`
        //                 res.redirect(`/categories?notif=${notif}`)
        //             })
        //             .catch(err => {
        //                 res.send(err)
        //             })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
    }
}

module.exports = IssueController