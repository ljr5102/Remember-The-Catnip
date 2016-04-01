var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Today = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {todayTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.getNewTodayTasks);
    APIUtil.getTodayTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewTodayTasks: function() {
    APIUtil.getTodayTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({todayTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Today");
    TaskActions.setStore(this.state.todayTasks);
  },

  render: function() {
    return (
      <li onClick={this.updateStore}>
        Today: {this.state.todayTasks.length}
      </li>
    );
  }
});

module.exports = Today;
