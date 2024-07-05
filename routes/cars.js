const router = require('express').Router();
const motosController = require('../controllers/cars.js');
//const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:id', motosController.getSingle);
router.get('/', motosController.getAll);
router.post('/', isAuthenticated, motosController.createMoto);
router.put('/:id', isAuthenticated, motosController.updateMoto);
router.delete('/:id', isAuthenticated, motosController.deleteMoto);

module.exports = router;