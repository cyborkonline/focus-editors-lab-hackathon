import React, { Component } from 'react';
import PropTypes from 'prop-types';

import homes from '../dev/homes.json';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: localStorage.focusAppLogin || false,
    };
    this.regionId = props.regionId;
    this.homes = homes;
  }

  generateHomeCarrousel() {
    const components = [];
    for (let i = 0; i < this.homes.homes.length; i += 1) {
      const home = this.homes.homes[i];
      if (home.id === this.regionId) {
        const storiesComponent = [];
        for (let stories = 0; stories < home.stories.length; stories += 1) {
          storiesComponent.push(
            <li>
              <a href={home.stories[stories]} target="_blank"> {home.stories[stories]}</a>
            </li>,
          );
        }
        components.push(
          <div className="home" key={i}>
            <img src={home.photo} alt="No pic available" className="home-thumbnail" />
            <div className="home-descriptor">
              <h4>{home.hosts ? `Willing to host journalists in ${home.name}` : ''}</h4>
              <h4>{home.meals ? `Willing to serve meals ${home.name}` : ''}</h4>
              <p> Topology:{home.type} </p>
              <p> {home.internet ? 'Has internet access' : 'No internet access'} </p>
              <ul className ="storyList">
                Stories written from this home
                {storiesComponent}
              </ul>
            </div>
          </div>,
        );
      }
    }
    return components;
  }
  render() {
    const homesComponent = this.generateHomeCarrousel();
    return (
      <div className="Homes">
        {homesComponent}
      </div>
    );
  }
}

Timeline.propTypes = {
  storyMode: PropTypes.string,
  regionId: PropTypes.number,
};
Timeline.defaultProps = {
  storyMode: '',
  regionId: '',
};
