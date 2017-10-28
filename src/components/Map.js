import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Modal from 'react-modal';
import ModalContent from './Modal';
import coordinates from '../dev/coordinates.json';

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
      zoom: 4,
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
      markersArray.push(
        <Marker
          position={latLong}
          key={id}
          onClick={() => {
            this.setState({
              modalOpen: !this.state.modalOpen,
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
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
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
            modalRegionId={this.state.modalRegionId}
          />
        </Modal>
      </div>
    );
  }
}
