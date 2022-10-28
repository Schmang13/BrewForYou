const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Schmang:codesmith@breweries.ekvhxo2.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'breweries'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err))

const Schema = mongoose.Schema;

const favoriteSchema = new Schema ({  
  name: {type: String, unique: true},
  address: String,
  postCode: String,
  phoneNum: String,
  url: String
});

const Favorite = mongoose.model('favorite', favoriteSchema);


const drankAtSchema = new Schema ({
  name: {type: String, unique: true},
  address: String,
  postCode: Number,
  phoneNum: Number,
  url: String
});

const DrankAt = mongoose.model('drankAt', drankAtSchema);


const yetToDrinkSchema = new Schema ({
  name: {type: String, unique: true},
  address: String,
  postCode: Number,
  phoneNum: Number,
  url: String
});

const YetToDrink = mongoose.model('yetToDrink', yetToDrinkSchema);

module.exports = {
  Favorite,
  DrankAt,
  YetToDrink
};