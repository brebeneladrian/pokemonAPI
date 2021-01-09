import React from "react";
import { HashRouter, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokeframe from "./Pokeframe/Pokeframe";
import DetailedView from "./DetailedView/DetailedView";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route path="/" exact component={Pokeframe} />
        <Route path="/pokedex-react" exact component={Pokeframe} />
        <Route path="/:pokemonId" exact component={DetailedView} />
      </div>
    </HashRouter>
  );
}

export default App;
