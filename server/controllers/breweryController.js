const models = require('../models/breweryModels');

const breweryController = {};

breweryController.addFavorite = (req, res, next) => {
  const {brewName, 
    brewAdd,
    brewPost, 
    brewPhone, 
    brewUrl} = req.body;

  models.Favorite.create({
    name: brewName, 
    address: brewAdd, 
    postCode: brewPost, 
    phoneNum: brewPhone, 
    url: brewUrl}, (err, car) => {
      if (err) return next('Error in breweryController.addFavorite: Brewery already favorited');
      next();
    })
};

breweryController.addDrankAt = (req, res, next) => {
  const {brewName, 
    brewAdd, 
    brewPost, 
    brewPhone, 
    brewUrl} = req.body;

  models.DrankAt.create({
    name: brewName, 
    address: brewAdd, 
    postCode: brewPost, 
    phoneNum: brewPhone, 
    url: brewUrl}, (err, car) => {
      if (err) return next('Error in breweryController.addDrankAt: Brewery already favorited');
      next();
    })
};

breweryController.addYetToDrink = (req, res, next) => {
  const {brewName, 
    brewAdd, 
    brewPost, 
    brewPhone, 
    brewUrl} = req.body;

  models.YetToDrink.create({
    name: brewName, 
    address: brewAdd, 
    postCode: brewPost, 
    phoneNum: brewPhone, 
    url: brewUrl}, (err, car) => {
      if (err) return next('Error in breweryController.addYetToDrink: Brewery already favorited');
      next();
    })
};

breweryController.getFavorites = (req, res, next) => {
  models.Favorite.find({}).exec()
  .then(favorites => {
    res.locals.favs = favorites;
    next();
  })
  .catch(err => {
    next({
      log:`breweryController.getFavorites: Error ${err}`,
      message: {
        err: `Error occured in breweryController.getFavorites. Connection to database is broken.`
      }
    })
  })
};

breweryController.getDrankAt = (req, res, next) => {
  models.DrankAt.find({}).exec()
  .then(drankAt => {
    res.locals.drank = drankAt;
    next();
  })
  .catch(err => {
    next({
      log:`breweryController.getDrankAt: Error ${err}`,
      message: {
        err: `Error occured in breweryController.getDrankAt. Connection to database is broken.`
      }
    })
  })
};

breweryController.getYetToDrink = (req, res, next) => {
  models.YetToDrink.find({}).exec()
  .then(yetToDrink => {
    res.locals.toDrink = yetToDrink;
    next();
  })
  .catch(err => {
    next({
      log:`breweryController.getYetToDrink: Error ${err}`,
      message: {
        err: `Error occured in breweryController.getYetToDrink. Connection to database is broken.`
      }
    })
  })
};

breweryController.deleteBrewery = (req, res, next) => {
  if (req.body.page === 'favorite'){
    models.Favorite.findOneAndDelete({name: req.body.brewName}, (err, brew) => {
      if (err) return next('Error in breweryController.deleteBrewery: Brewery doesn\'t exist.');
      // res.locals.tab = 'favorite';
      // res.locals.brew = brew.name
      next();
    })
  }
  if (req.body.page === 'drank-at'){
    models.DrankAt.findOneAndDelete({name: req.body.brewName}, (err, brew) => {
      if (err) return next('Error in breweryController.deleteBrewery: Brewery doesn\'t exist.');
      // res.locals.tab = 'drank-at';
      // res.locals.brew = brew.name
      next();
    })
  }
  if (req.body.page === 'yet-to-drink'){
    models.YetToDrink.findOneAndDelete({name: req.body.brewName}, (err, brew) => {
      if (err) return next('Error in breweryController.deleteBrewery: Brewery doesn\'t exist.');
      // res.locals.tab = 'yet-to-drink'
      // res.locals.brew = brew.name
      next();
    })
  }
}

module.exports = breweryController