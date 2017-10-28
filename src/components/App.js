/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import TEST_DATA from '../dev/testData.json';
import Divider from 'muicss/lib/react/divider';
import LeafletMap from './Map';
import LoginButton from './Login'

import "!style-loader!css-loader!sass-loader!../style.scss";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-Title">
          <h1>Focus</h1>

          <Divider />

          <div className="title-sections">
            Map
            <span className="divider-left"/>
            Timeline
            <span className="divider-left"/>
            About 
            <span className="divider-right"/>
            < LoginButton />
          </div>
        </div>
        < LeafletMap />
    </div>
    );
  }
}

export default App;
