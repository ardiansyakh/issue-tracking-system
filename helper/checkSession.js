const checkSession = (req, res, next) => {
    if (req.session.employee_username) {
        next()
    } else {
        let notif = `Please Login First`
        res.redirect(`/login?notif=${notif}`)
    }
}

module.exports = checkSession