import React, { useState } from 'react';
import Brewery from '../components/Brewery.js';

function Home() {

  const [breweryList, setBreweryList] = useState([]);
  const [apiCity, setApiCity] = useState('https://api.openbrewerydb.org/breweries?by_state=california&');
  const [apiBrewery, setApiBrewery] = useState('https://api.openbrewerydb.org/breweries?by_state=california&');


    const breweryArr = [];
    const breweryName = [];
    const breweryAddress = [];
    const breweryPostal = [];
    const breweryNumber = [];
    const breweryUrl = [];

    function handleSubmit(event) {
      event.preventDefault();
      let cityName = event.target.city.value;
      let cityName2 = event.target.city.value.toLowerCase();
      let breweryEntry = event.target.brewery.value;
      let breweryEntry2 = event.target.brewery.value.toLowerCase();

      if (cityName && !breweryEntry){
        fetch(apiCity + `by_city=${cityName2}&per_page=50`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length < 1) alert(`There are no breweries in ${cityName}. Maybe you should start one!`);
          console.log(data);
          for (let i = 0; i < data.length; i++){
            if (data[i].id === null || data[i].street === null || data[i].website_url === null) continue
            breweryName.push(data[i].name);
            breweryAddress.push(data[i].street+`, `+ data[i].city + `, California`);
            breweryPostal.push(data[i].postal_code.slice(0,5));
            breweryNumber.push(data[i].phone);
            breweryUrl.push(data[i].website_url);
          }
          for (let i = 0; i < breweryName.length; i++) {
            breweryArr.push(<Brewery
              key = {i}
              brewName={breweryName[i]}
              brewAdd={breweryAddress[i]}
              brewPost={breweryPostal[i]}
              brewPhone={breweryNumber[i]}
              brewUrl={breweryUrl[i]}
              />)
          }
          setBreweryList(breweryArr);
        })
      }
        // IF CLIENT ONLY ENTERS BREWERY NAME AND NO CITY
      if (breweryEntry && !cityName) {
        fetch(apiBrewery + `by_name=${breweryEntry2}&per_page=50`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length < 1) alert(`${breweryEntry} is not in our database.`)
          for (let i = 0; i < data.length; i++){
            if (data[i].id === null || data[i].street === null || data[i].website_url === null) continue
            breweryName.push(data[i].name);
            breweryAddress.push(data[i].street+`, `+ data[i].city + `, California`);
            breweryPostal.push(data[i].postal_code.slice(0,5));
            breweryNumber.push(data[i].phone);
            breweryUrl.push(data[i].website_url);
          }
          for (let i = 0; i < breweryName.length; i++) {
            breweryArr.push(<Brewery
              key = {i}
              brewName={breweryName[i]}
              brewAdd={breweryAddress[i]}
              brewPost={breweryPostal[i]}
              brewPhone={breweryNumber[i]}
              brewUrl={breweryUrl[i]}
              />)
          }
          setBreweryList(breweryArr);
        })
      }
      // IF CLIENT ENTERS BOTH CITY AND BREWERY
      if (breweryEntry && cityName) {
        fetch(apiCity + `by_city=${cityName2}&by_name=${breweryEntry2}&per_page=50`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length < 1) alert(`There is no ${breweryEntry} in ${cityName}.`)
          for (let i = 0; i < data.length; i++){
            if (data[i].id === null || data[i].street === null || data[i].website_url === null) continue
            breweryName.push(data[i].name);
            breweryAddress.push(data[i].street+`, ${cityName}, California`);
            breweryPostal.push(data[i].postal_code.slice(0,5));
            breweryNumber.push(data[i].phone);
            breweryUrl.push(data[i].website_url);
          }
          for (let i = 0; i < breweryName.length; i++) {
            breweryArr.push(<Brewery
              key = {i}
              brewName={breweryName[i]}
              brewAdd={breweryAddress[i]}
              brewPost={breweryPostal[i]}
              brewPhone={breweryNumber[i]}
              brewUrl={breweryUrl[i]}
              />)
          }
          setBreweryList(breweryArr);
        })
      }
      event.target.reset();
    }

  return (
    <div>
      <div className='search-area'>
        <div className='empty-space'></div>
          <form className='message-form' onSubmit={e => handleSubmit(e)}>
            <div className='search'>
              <input className='search-box'
                type='text'
                name='city'
                placeholder='Search by city'
                autoComplete='off'
                />
            </div>
            <div className="empty-search"></div>
            <div className='search'>
              <input className='search-box'
                type='text'
                name='brewery'
                id='brewery-input'
                placeholder='Search by brewery'
                autoComplete='off'
                />
            </div>
            <div className="empty-search"></div>
            <button type='submit' className='search-button'>
              Find Breweries
            </button>
          </form>
        <div className='empty-space'></div>
      </div>
      <div>
        {breweryList}
      </div>
    </div>
  );
}

export default Home