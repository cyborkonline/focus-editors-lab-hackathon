/* eslint-disable */
import React, { Component } from 'react';
import Divider from 'muicss/lib/react/divider';
import LeafletMap from './Map';
import LoginButton from './Login'

import "!style-loader!css-loader!sass-loader!../style.scss";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-Title">
          <img src="../../assets/focus_logo.png"/>
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
