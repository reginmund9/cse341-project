const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['dogs']
  const catId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('dogs').find({ _id: catId });
  result.toArray().then((cats) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cats[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['dogs']
  const result = await mongodb.getDatabase().db().collection('dogs').find();
  result.toArray().then((cats) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cats);
  });
};

const createCat = async (req, res) => {
  //#swagger.tags=['dogs']
  const cat = {
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('dogs').insertOne(cat);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating cat.')
  }
};

const updateCat = async (req, res) => {
  //#swagger.tags=['dogs']
  const catId = new ObjectId(req.params.id);
  const cat = {
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('dogs').replaceOne({ _id: catId }, cat);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating cat.')
  }
};

const deleteCat = async (req, res) => {
  //#swagger.tags=['dogs']
  const catId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('dogs').deleteOne({ _id: catId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting cat.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createCat,
  updateCat,
  deleteCat
};