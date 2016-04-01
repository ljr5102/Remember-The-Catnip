var TaskStore = require('../../../stores/task');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');

var React = require('react');

var Today = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {todayTasks: []};
  },

  componentDidMount: function() {
    // this.listenerToken = TaskStore.addListener(this.getNewTodayTasks);
    APIUtil.getTodayTasks(this.updateState);
  },

  updateState: function(tasks) {
    debugger
    this.setState({todayTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
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
