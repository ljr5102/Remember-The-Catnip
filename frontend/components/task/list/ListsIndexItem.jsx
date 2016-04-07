var React = require('react');
var APIUtil = require('../../../utils/api_util');
var InboxActions = require('../../../actions/inbox_actions');
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

var ListsIndexItem = React.createClass({
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
    e.preventDefault();
    this.setState({modalIsOpen: false});
  },

  updateList: function(e) {
    e.preventDefault();
    var listData = $(this.refs.editList).serialize();
    APIUtil.updateList(this.props.list.list_id, listData);
    this.setState({modalIsOpen: false});
  },

  deleteList: function(e) {
    e.preventDefault();
    APIUtil.deleteList(this.props.list)
    InboxActions.receiveClickedInbox("AllTasks");
    this.context.router.push("tasks");
    APIUtil.fetchAllTasks();
  },

  showTasksForList: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedList(this.props.list);
    APIUtil.fetchTasksForList(this.props.list.list_id);
  },

  render: function() {
    var taskStats = gatherTaskStats(this)
    return (
      <div>
        <li className="group" onClick={this.showTasksForList}>
          <div className="list-name-text">{this.props.list.name}</div>
          <strong className="badge">{this.props.list.task_count}</strong>
        </li>
        {taskStats}
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <h2 className="new-list-header">Edit list</h2>
          <form ref="editList" className="new-list-form group" onSubmit={this.updateList}>
            <label>List name:
              <input name="list[name]" defaultValue={this.props.list.name} type="text" />
            </label>
            <button className="new-list-add-button">Save</button>
            <button onClick={this.closeModal} className="new-list-cancel-button">Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
});

function gatherTaskStats(obj) {
  var taskStats;
  if (InboxStore.getCurrentList().list_id === obj.props.list.list_id) {
    taskStats = <div className="task-statistics">
                  <h2>{obj.props.list.name}</h2>
                  <button className="edit-list-button" onClick={obj.openModal}>Rename list...</button>
                  <button className="edit-list-button" onClick={obj.deleteList}>Delete</button>
                  <ul>
                    <li><div className="task-number">{obj.props.list.task_count}</div> tasks</li>
                  </ul>
                </div>
  } else {
    taskStats = <div></div>
  };
  return taskStats;
};

module.exports = ListsIndexItem;
