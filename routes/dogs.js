const router = require('express').Router();
const catsController = require('../controllers/dogs.js');
//const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:id', catsController.getSingle);
router.get('/', catsController.getAll);
router.post('/', isAuthenticated, catsController.createCat);
router.put('/:id', isAuthenticated, catsController.updateCat);
router.delete('/:id', isAuthenticated, catsController.deleteCat);

module.exports = router;