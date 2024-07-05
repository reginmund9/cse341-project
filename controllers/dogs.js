const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['dogs']
  const dogId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('dogs').find({ _id: dogId });
  result.toArray().then((dogs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(dogs[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['dogs']
  const result = await mongodb.getDatabase().db().collection('dogs').find();
  result.toArray().then((dogs) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(dogs);
  });
};

const createDog = async (req, res) => {
  //#swagger.tags=['dogs']
  const dog = {
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('dogs').insertOne(dog);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating dog.')
  }
};

const updateDog = async (req, res) => {
  //#swagger.tags=['dogs']
  const dogId = new ObjectId(req.params.id);
  const dog = {
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('dogs').replaceOne({ _id: dogId }, dog);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating dog.')
  }
};

const deleteDog = async (req, res) => {
  //#swagger.tags=['dogs']
  const dogId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('dogs').deleteOne({ _id: dogId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting dog.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createDog,
  updateDog,
  deleteDog
};