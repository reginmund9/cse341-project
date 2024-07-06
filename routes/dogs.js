const router = require('express').Router();
const dogsController = require('../controllers/dogs.js');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:id', dogsController.getSingle);
router.get('/', dogsController.getAll);
router.post('/', isAuthenticated, dogsController.createDog);
router.put('/:id', isAuthenticated, dogsController.updateDog);
router.delete('/:id', isAuthenticated, dogsController.deleteDog);

router.get('/:id',isAuthenticated, validation.checkMongoId, dogsController.getSingle);
router.get('/',isAuthenticated, dogsController.getAll);
router.post('/', isAuthenticated, validation.saveCat, dogsController.createDog);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveCat, dogsController.updateDog);
router.delete('/:id', isAuthenticated, validation.checkMongoId, dogsController.deleteDog);

module.exports = router;