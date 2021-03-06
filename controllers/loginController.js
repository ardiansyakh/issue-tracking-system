const {employee} = require('../models')
const bcrypt = require('bcrypt')


class LoginController{
    static loginForm(req, res){
        const {notif} = req.query
        res.render('./login', {notif})
    }
    static login(req, res){
        const {employee_username, employee_password} = req.body
        
        employee.findOne({
            where: {employee_username}
        })
        .then(result=>{
            if(result){
                let compare = bcrypt.compareSync(employee_password, result.employee_password)
                if(compare){
                    req.session.employee_username = result.employee_username
                    req.session.employee_role_id = result.employee_role_id

                    res.redirect('/')
                }else{
                    const notif = 'Invalid Email/Password'
                    res.redirect(`/login?notif=${notif}`)
                }
            }else{
                const notif = 'Invalid Email/Password'
                res.redirect(`/login?notif=${notif}`)
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static logout(req, res){
        if(req.session.employee_username){
            req.session.employee_username = null
            req.session.employee_role_id = null

            res.redirect('/')
        }
        let notif = `Please Login First`
        res.redirect(`/login?notif=${notif}`)
    }
}

module.exports = LoginController