import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import positions from '../dev/positions.json';


export default class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 4,
    };
    this.positions = positions;
  }

  pinMarkers() {
    const markersArray = [];
    const districtPositions = this.positions.districtPositions;
    for (const coordinates of districtPositions) { // eslint-disable-line
      markersArray.push(
        <Marker position={coordinates} key={districtPositions.indexOf(coordinates)}s>
          <Popup>
            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
          </Popup>
        </Marker>,
      );
    }
    return markersArray;
  }
  render() {
    return (
      <Map center={this.positions.focusPosition} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.pinMarkers()}
      </Map>
    );
  }
}
