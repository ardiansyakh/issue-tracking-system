const {employee, role} = require('../models')

class EmployeeController{
    static readAll(req, res){
        const {notif} = req.query
        employee.findAll({
            include:[{
                model: role,
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
       role.findAll()
       .then(result=>{
           res.render('./employee/add', {data:result})
       })
       .catch(err=>{
           res.send(err)
       })
    }
    static addPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        employee.create({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id})
        .then(result =>{
            const notif = `Success added: ${employee_first_name}` 
            res.redirect(`/employees?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static delete(req, res){
        let {id} = req.params
        employee.destroy({
            where: {id:+id}
        })
        .then(result =>{
            const notif = `Deleted Success` 
            res.redirect(`/employees?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static editForm(req, res){
        const {id} = req.params
        let roles
        role.findAll()
        .then(result =>{
            roles = result
            return employee.findOne({
                where: {id:+id},
                include:[{
                    model: role,
                    attributes: ['id','role_name']
                }]
            })
        })
        .then(result=>{
            res.render(`./employee/edit`, {data:result, roles})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static editPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        let {id} = req.params
        employee.update({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id},{
            where: {id:+id},
            returning: true
        })
        .then(result =>{
            const name = result[1][0].employee_first_name
            const notif = `Success update: ${name}` 
            res.redirect(`/employees?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = EmployeeController