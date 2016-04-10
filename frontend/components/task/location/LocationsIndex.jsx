var React = require('react');
var Modal = require('react-modal');
var APIUtil = require('../../../utils/api_util');
var LocationStore = require('../../../stores/location');
var LocationsIndexItem = require('./LocationsIndexItem');

var customStyles = {
  content: {
    top : '170px',
    left: '415px',
    right: '415px',
    bottom: '205px',
    padding: '35px'
  }
};

var LocationsIndex = React.createClass({
  getInitialState: function() {
    return {locations: LocationStore.all(), modalIsOpen: false}
  },

  componentWillMount: function() {
    var appElement = document.getElementById("root");
    Modal.setAppElement(appElement);
  },

  openModal: function(e) {
    e.stopPropagation();
    this.setState({modalIsOpen: true}, this.setUpAutocomplete);
  },

  componentDidMount: function() {
    this.listenerToken = LocationStore.addListener(this.updateLocations);
    APIUtil.fetchAllLocations();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  updateLocations: function() {
    this.setState({locations: LocationStore.all()});
  },

  closeModal: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({modalIsOpen: false});
  },

  setUpAutocomplete: function() {
    var input = document.getElementById('location-address')
    var autocomplete = new google.maps.places.Autocomplete(input, {});
  },

  createLocation: function(e) {
    e.preventDefault();
    var name = $("#location-name").val()
    var address = $("#location-address").val();
    var locationObject = {name: name, address: address}
    APIUtil.fetchCoordsForLocation(address, locationObject)
    this.closeModal();
  },

  showHideLocations: function(e) {
    e.preventDefault();
    switch ($(".location-location-items").length) {
      case 1:
        $(".location-location-items").removeClass("location-location-items").addClass("location-location-items-hidden");
        $(".arrow-down-location").removeClass("arrow-down-location").addClass("arrow-right-location")
        break;
      case 0:
        $(".location-location-items-hidden").removeClass("location-location-items-hidden").addClass("location-location-items");
        $(".arrow-right-location").removeClass("arrow-right-location").addClass("arrow-down-location")
        break;
    }
  },

  render: function() {
    var locationArray = this.state.locations.map(function(location, index) {
      return <LocationsIndexItem key={index} location={location} /> ;
    });
    return (
      <div className="locations-index">
        <h2 onClick={this.showHideLocations}>
          <div className="arrow-down-location"></div>
          Locations
          <button className="add-location-button" onClick={this.openModal}>+</button>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
            <h2 className="new-list-header">Add a location</h2>
            <form ref="createNewLocation" className="new-list-form group" onSubmit={this.createLocation}>
              <label>Name e.g. Home, Work
                <input id="location-name" name="location[name]" type="text" />
              </label>
              <label>Address e.g. 32 Cat Street, Catville
                <input id="location-address" name="location[address]" type="text" />
              </label>
              <button className="new-list-add-button">Add</button>
              <button onClick={this.closeModal} className="new-list-cancel-button">Cancel</button>
            </form>
          </Modal>
        </h2>
        <ul className="location-location-items">
          {locationArray}
        </ul>
      </div>
    )
  }
});

module.exports = LocationsIndex;
