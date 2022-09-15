const path = require('path');
const express = require('express');

const breweryController = require('./controllers/breweryController')

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});


//get and post requests for the Favorites
app.get('/personal/favorites', breweryController.getFavorites, (req, res) =>{
  res.status(200).json(res.locals.favs);
})
app.post('/personal/favorites', breweryController.addFavorite, (req, res) =>{
  res.sendStatus(200);
})

//get and post requests for the Drink At
app.get('/personal/drank-at', breweryController.getDrankAt, (req, res) => {
  res.status(200).json(res.locals.drank);
})
app.post('/personal/drank-at', breweryController.addDrankAt, (req, res) => {
  res.sendStatus(200);
})

//get and post requests for the Yet To Drink
app.get('/personal/yet-to-drink', breweryController.getYetToDrink, (req,res) => {
  res.status(200).json(res.locals.toDrink);
})
app.post('/personal/yet-to-drink', breweryController.addYetToDrink, (req, res) => {
  res.sendStatus(200);
})

//make sure to load original html when visiting personal page
app.get('/personal', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})
app.delete('/personal', breweryController.deleteBrewery, (req, res) =>{
  res.sendStatus(200);
})


//route handler for any unknown route requests
app.use('*', (req, res) => {
  res.status(404).send('No beers over here!')
});


//update the error handler to deal with this app
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});