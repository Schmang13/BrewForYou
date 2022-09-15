import React, { useState, useEffect } from 'react';
import SavedBrewery from '../components/SavedBrewery.js';
// import './personal.css';

function Personal() {

  const [breweryList, setBreweryList] = useState([]);

  const breweryArr = [];
  const breweryName = [];
  const breweryAddress = [];
  const breweryPostal = [];
  const breweryNumber = [];
  const breweryUrl = [];

  const favoritesTab = () => {
    console.log('Loading Favorites Tab.');
    fetch('/personal/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++){
        breweryName.push(data[i].name);
        breweryAddress.push(data[i].address);
        breweryPostal.push(data[i].postCode);
        breweryNumber.push(data[i].phoneNum);
        breweryUrl.push(data[i].url);
      }
      for (let i = 0; i < breweryName.length; i++) {
        breweryArr.push(<SavedBrewery
          key = {i}
          brewName={breweryName[i]}
          brewAdd={breweryAddress[i]}
          brewPost={breweryPostal[i]}
          brewPhone={breweryNumber[i]}
          brewUrl={breweryUrl[i]}
          page={'favorite'}
          />)
      }
      setBreweryList(breweryArr);
    })
  }

  const drankAtTab = () => {
    console.log('Loading Drank At Tab.');
    fetch('/personal/drank-at', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++){
        breweryName.push(data[i].name);
        breweryAddress.push(data[i].address);
        breweryPostal.push(data[i].postCode);
        if (data[i].phoneNum === null) breweryNumber.push('Not Available');
        if (typeof data[i].phoneNum === 'string' || typeof data[i].phoneNum === 'number') breweryNumber.push(data[i].phoneNum);
        breweryUrl.push(data[i].url);
      }
      for (let i = 0; i < breweryName.length; i++) {
        breweryArr.push(<SavedBrewery
          key = {i}
          brewName={breweryName[i]}
          brewAdd={breweryAddress[i]}
          brewPost={breweryPostal[i]}
          brewPhone={breweryNumber[i]}
          brewUrl={breweryUrl[i]}
          page={'drank-at'}
          />)
      }
      setBreweryList(breweryArr);
    })
  }

  const yetToDrinkTab = () => {
    console.log('Loading Yet To Drink Tab.')
    fetch('/personal/yet-to-drink', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++){
        breweryName.push(data[i].name);
        breweryAddress.push(data[i].address);
        breweryPostal.push(data[i].postCode);
        if (data[i].phoneNum === null) breweryNumber.push('Not Available');
        if (typeof data[i].phoneNum === 'string' || typeof data[i].phoneNum === 'number') breweryNumber.push(data[i].phoneNum);
        breweryUrl.push(data[i].url);
      }
      for (let i = 0; i < breweryName.length; i++) {
        breweryArr.push(<SavedBrewery
          key = {i}
          brewName={breweryName[i]}
          brewAdd={breweryAddress[i]}
          brewPost={breweryPostal[i]}
          brewPhone={breweryNumber[i]}
          brewUrl={breweryUrl[i]}
          page={'yet-to-drink'}
          />)
      }
      setBreweryList(breweryArr);
    })
  }

  return (
    <div>
      <div className="personal-controls">
      <div className="empty-space"></div>
      <button type="button" onClick={favoritesTab} className="personal-button">Favorites</button>
      <button type="button" onClick={drankAtTab} className="personal-button">Drank At</button>
      <button type="button" onClick={yetToDrinkTab} className="personal-button">To Drink</button>
      <div className="empty-space"></div>
      </div>
      <div>
      {breweryList}
      </div>
    </div>
  );
}

export default Personal