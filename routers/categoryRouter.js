const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const checkSessionAuth = require('../helpers/checkSessionAuth')

router.get('/', checkSessionAuth, CategoryController.listCategory)
router.post('/', checkSessionAuth, CategoryController.listCategoryPost)
router.get('/edit/:id', checkSessionAuth, CategoryController.editCategory)
router.post('/edit/:id', checkSessionAuth, CategoryController.editCategoryPost)
router.get('/delete/:id', checkSessionAuth, CategoryController.deleteCategory)

module.exports = router