const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['cars']
  const motoId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('cars').find({ _id: motoId });
  result.toArray().then((motos) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(motos[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['cars']
  const result = await mongodb.getDatabase().db().collection('cars').find();
  result.toArray().then((motos) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(motos);
  });
};

const createMoto = async (req, res) => {
  //#swagger.tags=['cars']
  const moto = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engineSize: req.body.engineSize,
    transmissionType: req.body.transmissionType,
    gearCount: req.body.gearCount,
    shifterType: req.body.shifterType
  };
  const result = await mongodb.getDatabase().db().collection('cars').insertOne(moto);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating moto.')
  }
};

const updateMoto = async (req, res) => {
  //#swagger.tags=['cars']
  const motoId = new ObjectId(req.params.id);
  const moto = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engineSize: req.body.engineSize,
    transmissionType: req.body.transmissionType,
    gearCount: req.body.gearCount,
    shifterType: req.body.shifterType
  };
  const result = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: motoId }, moto);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating moto.')
  }
};

const deleteMoto = async (req, res) => {
  //#swagger.tags=['cars']
  const motoId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: motoId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting moto.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createMoto,
  updateMoto,
  deleteMoto
};