/* eslint-disable */
import React, { Component } from 'react';
import Divider from 'muicss/lib/react/divider';
import LeafletMap from './Map';
import Timeline from './Timeline';
import LoginButton from './Login'

import "!style-loader!css-loader!sass-loader!../style.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyMode: ''
    };
  }
  
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
