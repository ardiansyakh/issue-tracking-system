const { role, employee } = require('../models')

class RoleController {
    static listRole(req, res) {
        role.findAll()
            .then(result => {
                res.render('role', { data: result })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listRoleUser(req, res) {
        const { id } = req.params

        employee.findAll({
            where: {
                employee_role_id: +id
            },
            include: role,
            order: [['employee_first_name', 'ASC']]
        })
            .then(result => {
                //res.send(result)
                res.render('roleUser', { data: result })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = RoleController