var TaskActions = require('../../../actions/task_actions');
var APIUtil = require('../../../utils/api_util');

var React = require('react');

var AllTasks = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {allTasks: []};
  },

  componentDidMount: function() {
    APIUtil.getAllTasks(this.updateState);
  },

  updateState: function(tasks) {
    this.setState({allTasks: tasks});
  },

  updateStore: function() {
    this.context.router.push("tasks")
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
