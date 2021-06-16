const {employees, roles} = require('../models')

class EmployeeController{
    static readAll(req, res){
        const {notif} = req.query
        employees.findAll({
            include:[{
                model: roles,
                attributes: ['role_name']
            }]
        })
        .then(result=>{
            res.render('./employee/list', {data:result, notif})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static addForm(req, res){
       roles.findAll()
       .then(result=>{
           res.render('./employee/add', {data:result})
       })
       .catch(err=>{
           res.send(err)
       })
    }
    static addPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        employees.create({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id})
        .then(result =>{
            const notif = `Success added: ${employee_first_name}` 
            res.redirect(`/employee?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static delete(req, res){
        let {id} = req.params
        employees.destroy({
            where: {id:+id}
        })
        .then(result =>{
            const notif = `Deleted Success` 
            res.redirect(`/employee?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static editForm(req, res){
        const {id} = req.params
        let role
        roles.findAll()
        .then(result =>{
            role = result
            return employees.findOne({
                where: {id:+id},
                include:[{
                    model: roles,
                    attributes: ['id','role_name']
                }]
            })
        })
        .then(result=>{
            res.render(`./employee/edit`, {data:result, role})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static editPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        let {id} = req.params
        employees.update({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id},{
            where: {id:+id},
            returning: true
        })
        .then(result =>{
            const name = result[1][0].employee_first_name
            const notif = `Success update: ${name}` 
            res.redirect(`/employee?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = EmployeeController