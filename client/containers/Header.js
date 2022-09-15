import React from 'react';

function Header() {
  return (
    <div>
      <a href='/' className="home">Home</a>
      <a href='/personal' className="personal">Personal Page</a>
      <header className="header">
        <h1>A Brew Near You</h1>
      </header>
    </div>
  );
}

export default Header