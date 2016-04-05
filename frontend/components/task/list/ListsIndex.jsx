var React = require('react');
var Modal = require('react-modal');
var ListStore = require('../../../stores/list');
var APIUtil = require('../../../utils/api_util');
var ListsIndexItem = require('./ListsIndexItem');

var customStyles = {
  content : {
    top : '235px',
    left: '450px',
    right: '450px',
    bottom: '235px',
    padding: '35px'
  }
};

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

  createList: function(e) {
    e.preventDefault();
    var listData = $(this.refs.createNewList).serialize();
    APIUtil.createList(listData);
    this.setState({modalIsOpen: false});
  },

  updateLists: function() {
    this.setState({lists: ListStore.all()});
  },

  render: function() {
    var listArray = this.state.lists.map(function(list) {
      return <ListsIndexItem key={list.list_id} list={list} />;
    })
    return (
      <div className="lists-index">
        <h2>Lists</h2>
        <button className="add-list-button" onClick={this.openModal}>+</button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <h2 className="new-list-header">Add a list</h2>
          <form ref="createNewList" className="new-list-form group" onSubmit={this.createList}>
            <label>Please enter a new list name:
              <input name="list[name]" type="text" />
            </label>
            <button className="new-list-add-button">Add</button>
            <button onClick={this.closeModal} className="new-list-cancel-button">Cancel</button>
          </form>
        </Modal>
        <ul>
          {listArray}
        </ul>
      </div>
    );
  }
});

module.exports = ListsIndex;
