import React, { useState } from 'react';

const SavedBrewery = props => {

  const [breweryList, setBreweryList] = useState([]);

  //These buttons and fetches should be moved to the container page and queries should happen on the backend, not frontend

  const removeBrewery = () => {
    console.log(`Deleted from ${props.page} page.`);
    console.log(props);
    fetch('/personal', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props),
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
        <button type="button" onClick={removeBrewery} className="brewery-delete">Remove Brewery</button>
      </div>
    </div>
  );
};

export default SavedBrewery;