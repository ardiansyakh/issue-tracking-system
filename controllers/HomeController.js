const {category, issue} = require('../models')
class HomeController {
    static home(req, res) {
        res.render('index')
    }
    //start highchart
    static dashboard(req, res) {
        category.findAll({
            include: issue
        })
            .then(result => {

                let category = []
                result.forEach(element => {
                    category.push(element.category_name)
                });

                let issueCount = []
                result.forEach(element => {
                    issueCount.push(element.issues.length)
                });

                //res.send(result)
                res.render('dashboard', { category: category, issueCount: issueCount })
            })
            .catch(err => {
                res.send(err)
            })
    }//end highchart
}

module.exports = HomeController