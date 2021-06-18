const checkSessionAuth = (req, res, next) => {
    if (req.session.employee_role_id == 1) {
        next()
    } else {
        let notif = `access denied`
        res.redirect(`/?notif=${notif}`)
    }
}

module.exports = checkSessionAuth