const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['cars']
  const carId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
  result.toArray().then((cars) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['cars']
  const result = await mongodb.getDatabase().db().collection('cars').find();
  result.toArray().then((cars) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars);
  });
};

const createCar = async (req, res) => {
  //#swagger.tags=['cars']
  const car = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engineSize: req.body.engineSize,
    transmissionType: req.body.transmissionType,
    gearCount: req.body.gearCount,
    shifterType: req.body.shifterType
  };
  const result = await mongodb.getDatabase().db().collection('cars').insertOne(car);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating car.')
  }
};

const updateCar = async (req, res) => {
  //#swagger.tags=['cars']
  const carId = new ObjectId(req.params.id);
  const car = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engineSize: req.body.engineSize,
    transmissionType: req.body.transmissionType,
    gearCount: req.body.gearCount,
    shifterType: req.body.shifterType
  };
  const result = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: carId }, car);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating car.')
  }
};

const deleteCar = async (req, res) => {
  //#swagger.tags=['cars']
  const carId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting car.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createCar,
  updateCar,
  deleteCar
};