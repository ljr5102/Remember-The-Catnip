var React = require('react');
var APIUtil = require('../../../utils/api_util');
var InboxActions = require('../../../actions/inbox_actions');
var TaskActions = require('../../../actions/task_actions');
var InboxStore = require('../../../stores/inbox');
var Modal = require('react-modal');

var customStyles = {
  content : {
    top : '235px',
    left: '450px',
    right: '450px',
    bottom: '235px',
    padding: '35px'
  }
};

var EditList = React.createClass({
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

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function(e) {
    if(e) {
      e.preventDefault();
    }
    this.setState({modalIsOpen: false});
  },

  updateList: function(e) {
    e.preventDefault();
    if ($("#list-name").val()) {
      var listData = $(this.refs.editList).serialize();
      APIUtil.updateList(this.props.list.list_id, listData);
      this.setState({modalIsOpen: false});
    } else {
      $(".list-error-alert-hidden").removeClass("list-error-alert-hidden").addClass("list-error-alert")
    }
  },

  deleteList: function(e) {
    e.preventDefault();
    APIUtil.deleteList(this.props.list)
    InboxActions.receiveClickedInbox("AllTasks");
    this.context.router.push("tasks");
    APIUtil.fetchAllTasks();
  },

  render: function() {
    return (
        <div>
          <button className="edit-list-button" onClick={this.openModal}>Rename list...</button>
          <button className="delete-list-button" onClick={this.deleteList}>Delete</button>
          <Modal className= "list-modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <h2 className="new-list-header">Edit list</h2>
            <form ref="editList" className="new-list-form group" onSubmit={this.updateList}>
              <div className="list-error-alert-hidden">
                <div className="list-error-alert-img"></div>
                Name cannot be blank
              </div>
              <label>List name:
                <input id="list-name" name="list[name]" defaultValue={this.props.list.name} type="text" />
              </label>
              <button className="new-list-add-button">Save</button>
              <button onClick={this.closeModal} className="new-list-cancel-button">Cancel</button>
            </form>
          </Modal>
        </div>
    );
  }
});

module.exports = EditList;
