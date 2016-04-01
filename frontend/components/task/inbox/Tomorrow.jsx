var TaskStore = require('../../../stores/task');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');

var React = require('react');

var Tomorrow = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {tomorrowTasks: []};
  },

  componentDidMount: function() {
    // this.listenerToken = TaskStore.addListener(this.getNewTodayTasks);
    APIUtil.getTomorrowTasks(this.updateState);
  },

  updateState: function(tasks) {
    debugger
    this.setState({tomorrowTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    TaskActions.setStore(this.state.tomorrowTasks);
  },

  render: function() {
    return (
      <li onClick={this.updateStore}>
        Tomorrow: {this.state.tomorrowTasks.length}
      </li>
    );
  }
});

module.exports = Tomorrow;
