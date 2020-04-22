import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MainMenu = () => {
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
  </div>
}

const Home = () => (
  <div>
    Home
  </div>
)

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
            <MainMenu/>
        <p>
          Welcome Team <code>cd ur_mom</code>!
        </p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img height="200px" src="https://miro.medium.com/max/1400/1*9jS8jXHZfPGezf8t_BpfUg.png"  />
          <img height="200px" src="https://pbs.twimg.com/profile_images/956692354429169665/qjNyeXIt.jpg"  />

        </div>
        <div>
          <img height="200px" src="https://fairfieldcountylook.com/wp-content/gallery/2016-05-06-arch-street-25th-anniversary-benefit/cache/5D3_4282-Turner-Franco-Brooks-Minor-and-Scott-and-John-Gibbons.jpg-nggid0529149-ngg0dyn-320x0-00f0w010c010r110f110r010t010.jpg"  />
          <img height="200px" src="https://photos.smugmug.com/Pasadena/Community/NCL-Tribute-Luncheon-Honors-Mothers/i-QQThbWL/0/e81bcc73/M/0753%20Lily%20and%20Georgina%20Maechling-M.jpg"  />
        </div>

        <p>
          I am excited to see the great things you do with this code :)
        </p>
      </header>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </div>
    </Router>
  );
}

export default App;
