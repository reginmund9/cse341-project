const router = require('express').Router();
const carsController = require('../controllers/cars.js');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

//router.get('/:id', carsController.getSingle);
//router.get('/', carsController.getAll);
//router.post('/', isAuthenticated, carsController.createCar);
//router.put('/:id', isAuthenticated, carsController.updateCar);
//router.delete('/:id', isAuthenticated, carsController.deleteCar);

router.get('/:id',isAuthenticated, validation.checkMongoId, carsController.getSingle);
router.get('/',isAuthenticated, carsController.getAll);
router.post('/', isAuthenticated, validation.saveCar, carsController.createCar);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveCar, carsController.updateCar);
router.delete('/:id', isAuthenticated, validation.checkMongoId, carsController.deleteCar);

module.exports = router;