var React = require('react');

var LocationsIndex = React.createClass({

  openModal: function() {

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
    return (
      <div className="locations-index">
        <h2 onClick={this.showHideLocations}>
          <div className="arrow-down-location"></div>
          Locations
          <button className="add-location-button" onClick={this.openModal}>+</button>
        </h2>
        <ul className="location-location-items">
          <li></li>
        </ul>
      </div>
    )
  }
});

module.exports = LocationsIndex;
