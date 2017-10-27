/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import TEST_DATA from '../dev/testData.json';
import LeafletMap from './Map';


import "!style-loader!css-loader!sass-loader!../../node_modules/muicss/dist/css/mui.min.css";
import "!style-loader!css-loader!sass-loader!../style.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-Title">
          <h1>Focus</h1>
        </div>
          < LeafletMap />
      </div>
    );
  }
}

export default App;
