import React, { Component } from 'react';
import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import Modal from 'react-modal';
import ModalContent from './Modal';
import coordinates from '../dev/coordinates.json';
import worldGeoJson from '../../assets/world.geo.json';

const modalContentStyle = {
  position: 'absolute',
};

const modalOverlayStyle = {
  position: 'absolute',
  zIndex: 1000,
};


export default class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 6,
      modalOpen: false,
      modalRegionId: 0,
    };
    this.coordinates = coordinates;
  }
  componentDidMount() {
    Modal.setAppElement('.LeafletMap');
  }

  pinMarkers() {
    const markersArray = [];
    const districtPositions = this.coordinates.districts;
    for (let i = 0; i < districtPositions.length; i++) { // eslint-disable-line
      const latLong = districtPositions[i].coordinates;
      const id = districtPositions[i].id;
      const name = districtPositions[i].name;
      markersArray.push(
        <Marker
          position={latLong}
          key={id}
          onClick={() => {
            this.setState({
              modalOpen: !this.state.modalOpen,
              modalRegionName: name,
              modalRegionId: id,
            });
          }}
        />,
      );
    }
    return markersArray;
  }

  render() {
    return (
      <div className="LeafletMap">
        <Map center={this.coordinates.initialFocus} zoom={this.state.zoom}>
          <TileLayer
            url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
          <GeoJSON
            className="overlayLayer"
            data={worldGeoJson}
          />
          {this.pinMarkers()}
        </Map>
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={() => { this.setState({ modalOpen: true }); }}
          onRequestClose={() => { this.setState({ modalOpen: false }); }}
          /*
          closeTimeoutMS={n}
          */
          style={{
            overlay: modalOverlayStyle,
            content: modalContentStyle,
          }}
          contentLabel="Modal"
        >
          <ModalContent
            storyMode={this.storyMode || ''}
            modalRegionId={this.state.modalRegionId || 0}
            modalRegionName={this.state.modalRegionName || 'Portugal'}
          />
        </Modal>
      </div>
    );
  }
}

