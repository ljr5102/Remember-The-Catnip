var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var AllTasks = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {allTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.getAllNewTasks);
    APIUtil.getAllTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getAllNewTasks: function() {
    APIUtil.getAllTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({allTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("AllTasks");
    TaskActions.setStore(this.state.allTasks);
  },

  render: function() {
    return (
      <li onClick={this.updateStore}>
        All Tasks: {this.state.allTasks.length}
      </li>
    );
  }

});

module.exports = AllTasks;
