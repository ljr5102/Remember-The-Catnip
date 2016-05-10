var React = require('react');
var Modal = require('react-modal');
var InboxStore = require('../../../stores/inbox');
var InboxActions = require('../../../actions/inbox_actions');
var TaskActions = require('../../../actions/task_actions');
var APIUtil = require('../../../utils/api_util');

var customStyles = {
  content: {
    top : '170px',
    left: '415px',
    right: '415px',
    bottom: '205px',
    padding: '35px'
  }
};

var LocationsIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {modalIsOpen: false}
  },

  componentWillMount: function() {
    var appElement = document.getElementById("root");
    Modal.setAppElement(appElement);
  },

  componentDidMount: function() {

  },

  openModal: function(e) {
    this.setState({modalIsOpen: true}, this.setUpAutocomplete);
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

  showTasksForLocation: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedLocation(this.props.location)
    TaskActions.setTasksForCurrentInbox();
  },

  updateLocation: function(e) {
    e.preventDefault();
    alert("This feature has not been implemented yet :(")
  },

  deleteLocation: function(e) {
    e.preventDefault();
    alert("This feature has not been implemented yet :(")
  },

  render: function() {
    return (
      <div>
        <button className="edit-list-button" onClick={this.openModal}>Edit location...</button>
        <button className="delete-list-button" onClick={this.deleteLocation}>Delete</button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <h2 className="new-list-header">Add a location</h2>
          <form ref="createNewLocation" className="new-list-form group" onSubmit={this.updateLocation}>
            <label>Name e.g. Home, Work
              <input name="location[name]" type="text" defaultValue={this.props.location.name}/>
            </label>
            <label>Address e.g. 32 Cat Street, Catville
              <input id="location-address" name="location[address]" type="text" defaultValue={this.props.location.address}/>
            </label>
            <button className="new-list-add-button">Add</button>
            <button onClick={this.closeModal} className="new-list-cancel-button">Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = LocationsIndexItem;
