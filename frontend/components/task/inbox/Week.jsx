var TaskStore = require('../../../stores/task');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');

var React = require('react');

var Week = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {weekTasks: []};
  },

  componentDidMount: function() {
    // this.listenerToken = TaskStore.addListener(this.getNewTodayTasks);
    APIUtil.getWeekTasks(this.updateState);
  },

  updateState: function(tasks) {
    debugger
    this.setState({weekTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    TaskActions.setStore(this.state.weekTasks);
  },

  render: function() {
    return (
      <li onClick={this.updateStore}>
        Week: {this.state.weekTasks.length}
      </li>
    );
  }
});

module.exports = Week;
