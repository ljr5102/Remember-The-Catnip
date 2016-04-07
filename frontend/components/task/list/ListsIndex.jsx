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

  openModal: function(e) {
    e.stopPropagation();
    this.setState({modalIsOpen: true});
  },

  closeModal: function(e) {
    e.preventDefault();
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

  showHideLists: function(e) {
    e.preventDefault();
    switch ($(".list-list-items").length) {
      case 1:
        $(".list-list-items").removeClass("list-list-items").addClass("list-list-items-hidden");
        $(".arrow-down-list").removeClass("arrow-down-list").addClass("arrow-right-list")
        break;
      case 0:
        $(".list-list-items-hidden").removeClass("list-list-items-hidden").addClass("list-list-items");
        $(".arrow-right-list").removeClass("arrow-right-list").addClass("arrow-down-list")
        break;
    }
  },

  render: function() {
    var listArray = this.state.lists.map(function(list) {
      return <ListsIndexItem key={list.list_id} list={list} />;
    })
    return (
      <div className="lists-index">
        <h2 onClick={this.showHideLists}><div className="arrow-down-list"></div>Lists<button className="add-list-button" onClick={this.openModal}>+</button></h2>
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
        <ul className="list-list-items">
          {listArray}
        </ul>
      </div>
    );
  }
});

module.exports = ListsIndex;
