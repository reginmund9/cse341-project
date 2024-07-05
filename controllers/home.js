const name = { name: 'Ramon Vargas - Project 2' };

const justHome = async (req, res) => {
  //#swagger.tags=['Home']
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(name.name);
};

module.exports = { justHome };