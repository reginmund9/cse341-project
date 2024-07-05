const validator = require('../helpers/validate');

const saveCat = (req, res, next) => {
  const validationRule = {
    name: 'required|min:1|max:30|string',
    breed: 'required|min:1|max:30|string',
    gender: 'required|min:1|max:10|string',
    color: 'required|min:1|max:20|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveMoto = (req, res, next) => {
    const validationRule = {
      year: ['required', 'regex:/^(19|20)[\\d]{2,2}$/'],
      make: 'required|min:1|max:20|string',
      model: 'required|min:1|max:20|string',
      color: 'required|min:1|max:10|string',
      engineSize: 'required|min:1|max:10|string',
      transmissionType: 'required|min:1|max:10|string',
      gearCount: 'required|min:1|max:5|string',
      shifterType: 'required|min:1|max:20|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  const checkMongoId = (req, res, next) => {
    const validationRule = {
      id: 'required|min:24|max:24|string'
    };
    validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  }
module.exports = {
  saveCat,
  saveMoto,
  checkMongoId
};