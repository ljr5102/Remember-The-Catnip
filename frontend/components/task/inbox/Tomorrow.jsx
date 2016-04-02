var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var Tomorrow = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {tomorrowTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.getNewTomorrowTasks);
    APIUtil.getTomorrowTasks(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getNewTomorrowTasks: function() {
    APIUtil.getTomorrowTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({tomorrowTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("Tomorrow");
    TaskActions.setStore(this.state.tomorrowTasks);
  },

  render: function() {
    return (
      <li className="group" onClick={this.updateStore}>
        Tomorrow <strong className="badge">{this.state.tomorrowTasks.length}</strong>
      </li>
    );
  }
});

module.exports = Tomorrow;
