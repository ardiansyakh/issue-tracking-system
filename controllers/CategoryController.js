const { category } = require('../models')

class CategoryController {
    static listCategory(req, res) {
        let { notif } = req.query

        category.findAll()
            .then(result => {
                res.render('category', { data: result, notif: notif })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listCategoryPost(req, res) {
        const { category_name } = req.body

        category.create({ category_name })
            .then(result => {
                //console.log(result);
                let notif = `Successfully added category "${result.dataValues.category_name}"`
                res.redirect(`/categories?notif=${notif}`)
            })
            .catch(err => {
                res.send(err)
            })


    }

    static editCategory(req, res) {
        const { id } = req.params
        let { notif } = req.query

        category.findOne({
            where: { id: +id }
        })
            .then((result) => {
                res.render('editCategory', { data: result, notif: notif })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editCategoryPost(req, res) {
        const { id } = req.params
        const { category_name } = req.body

        category.update(
            { category_name },
            {
                where: { id: +id },
                returning: true
            })
            .then(result => {
                let notif = `Successfully updated category "${result[1][0].dataValues.category_name}"`
                res.redirect(`/categories?notif=${notif}`)
            })
            .catch(err => {
                res.send(err)
            })

    }

    static deleteCategory(req, res) {
        const { id } = req.params

        category.findOne({
            where: { id: +id }
        })
            .then((result) => {
                return category.destroy({
                    where: { id: +id }
                })
                    .then((result2) => {
                        let notif = `Successfully deleted category ${result.dataValues.category_name}`
                        res.redirect(`/categories?notif=${notif}`)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = CategoryController