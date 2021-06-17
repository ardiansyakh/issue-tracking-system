const {employee, role} = require('../models')

class EmployeeController{
    static readAll(req, res){
        const {notif} = req.query
        let roles
        role.findAll()
        .then(result=>{
            roles = result
            return employee.findAll({
                include:[{
                    model: role,
                    attributes: ['role_name']
                }]
            })
        })
        .then(result=>{
            res.render('./employee', {data:result, notif, roles})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static addPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        employee.findAll({
        where: {employee_username}
        })
        .then(result=>{
            if(result.length===0){
                return employee.create({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id})
            }else{
                const notif = `Failed: username already exist`
                res.redirect(`/employees?notif=${notif}`)                
            }
        })
        .then(result=>{
            const notif = `Successfully added employee: ${employee_first_name}` 
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
            const notif = `Successfully delete` 
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
            res.render(`./editEmployee`, {data:result, roles})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static editPost(req, res){
        const {employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id} = req.body
        let {id} = req.params

        employee.findAll({
            where: {employee_username}
        })
        .then(result=>{
            if(result.length===0){
                return employee.update({employee_username, employee_password, employee_first_name, employee_last_name, employee_role_id},{
                    where: {id:+id},
                    returning: true
                })
            }else{
                const notif = `Failed: username already exist`
                res.redirect(`/employees?notif=${notif}`)                
            }
        })
        .then(result =>{
            const name = result[1][0].employee_first_name
            const notif = `Successfully updated employee: ${name}` 
            res.redirect(`/employees?notif=${notif}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = EmployeeController