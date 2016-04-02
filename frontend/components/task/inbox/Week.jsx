var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Week = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {weekTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.getNewWeekTasks);
    APIUtil.getWeekTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewWeekTasks: function() {
    APIUtil.getWeekTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({weekTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Week");
    TaskActions.setStore(this.state.weekTasks);
  },

  render: function() {
    return (
      <li className="group" onClick={this.updateStore}>
        Week <strong className="badge">{this.state.weekTasks.length}</strong>
      </li>
    );
  }
});

module.exports = Week;
