import React from 'react';

const Brewery = props => {
  console.log(props);
  const saveFavorite = () => {
    console.log('Saved to \'Favorites\' page');
    console.log(props);
    fetch('/personal/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props),
    })
    .then(resp => {
      if(resp.status === 500){
        alert(`You have already favorited ${props.brewName}!`)
      }
    })
  }

  const saveDrankAt = () => {
    console.log('Saved to \'Drank At\' page');
    fetch('/personal/drank-at', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(props)
    })
    .then(resp => {
      if(resp.status === 500){
        alert(`You already drank at ${props.brewName}!`)
      }
    })
  }

  const saveToDrink = () => {
    console.log('Saved to \'To Drink\' page');
    fetch('/personal/yet-to-drink', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(props)
    })
    .then(resp => {
      if(resp.status === 500){
        alert(`You have already add ${props.brewName}to your To Drink list.`)
      }
    })
  }

  return (
  // flexbox container set to rows centered from top to bottom
  <div className="brewery-tabs">
    <div className="brew-name">
          <h2>{props.brewName}</h2>
        </div>
    <div className="brewery-info">
      <h3>Address: <span className="brewery-address">{props.brewAdd}, {props.brewPost}</span></h3>
      <h3>Phone: <span className="brewery-address">{props.brewPhone}</span></h3>
      <h3>Website: <a className='brew-url' target='_blank' href={props.brewUrl}>{props.brewName.toLowerCase()}</a></h3>
    </div>
    <div className="brewery-buttons-div">
      <button type="button" onClick={saveFavorite} className="brewery-buttons">Favorite</button>
      <button type="button" onClick={saveDrankAt} className="brewery-buttons">Drank at</button>
      <button type="button" onClick={saveToDrink} className="brewery-buttons">To drink</button>
    </div>
    </div>
  );
};

export default Brewery;