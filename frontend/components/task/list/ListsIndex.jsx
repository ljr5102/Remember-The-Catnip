var React = require('react');
var Modal = require('react-modal');
var ListStore = require('../../../stores/list');
var APIUtil = require('../../../utils/api_util');
var ListsIndexItem = require('./ListsIndexItem');

var ListsIndex = React.createClass({

  getInitialState: function() {
    return {lists: ListStore.all(), modalIsOpen: false};
  },

  componentWillMount: function() {
    var appElement = document.getElementById("root");
    Modal.setAppElement(appElement);
  },

  componentDidMount: function() {
    this.listenerToken = ListStore.addListener(this.updateLists);
    APIUtil.fetchAllLists();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  updateLists: function() {
    this.setState({lists: ListStore.all()});
  },

  render: function() {
    var listArray = this.state.lists.map(function(list) {
      return <ListsIndexItem list={list} />;
    })
    return (
      <div>
        <h2>Lists</h2>
        <button onClick={this.openModal}>Add List</button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
          <h2>Welcome to your fun modal!</h2>
        </Modal>
        <ul>
          {listArray}
        </ul>
      </div>
    );
  }
});

module.exports = ListsIndex;
