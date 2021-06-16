const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/', CategoryController.listCategory)
router.post('/', CategoryController.listCategoryPost)
router.get('/edit/:id', CategoryController.editCategory)
router.post('/edit/:id', CategoryController.editCategoryPost)
router.get('/delete/:id', CategoryController.deleteCategory)

module.exports = router