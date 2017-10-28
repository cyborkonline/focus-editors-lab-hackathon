import React, { Component } from 'react';
import PropTypes from 'prop-types';

import homes from '../dev/homes.json';

export default class Home extends Component {
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
        for (let story = 0; story < home.stories.length; story += 1) {
          storiesComponent.push(
            <li key={story}>
              <a href={home.stories[story]} target="_blank"> {home.stories[story]}</a>
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
              <ul className="storyList">
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

Home.propTypes = {
  regionId: PropTypes.number,
};
Home.defaultProps = {
  regionId: '',
};
