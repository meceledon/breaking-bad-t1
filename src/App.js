import React from 'react';
import './App.css';
import Home from './components/home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Temporadas_bb from './components/temporadas_bb';
import Temporadas_bcs from './components/temporadas_bcs';
import Episode from './components/episode';
import Character from './components/character';


function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/Breaking+Bad/:temp" exact component={Temporadas_bb} />
          <Route path="/Better+Call+Saul/:temp" component={Temporadas_bcs} />
          <Route path="/episodes/:episode" component={Episode} />
          <Route path="/characters/:character_name" component={Character} />
          
        </div>
      </Switch>
    </Router>
  );
}

export default App;
