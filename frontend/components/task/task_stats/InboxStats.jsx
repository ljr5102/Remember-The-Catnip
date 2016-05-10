var React = require('react');
var InboxStore = require('../../../stores/inbox');
var TaskStore = require('../../../stores/task');

var InboxStats = React.createClass({
  getInitialState: function() {
    return({taskCount: TaskStore.all().length})
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateCount);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  updateCount: function() {
    this.setState({taskCount: TaskStore.all().length});
  },

  render: function() {
    var name;
    if (this.props.inbox === "AllTasks") {
      name = "All Tasks";
    } else {
      name = this.props.inbox
    }
    return (
      <div className="task-statistics">
        <h2>{name}</h2>
        <ul>
          <li><div className="task-number">{this.state.taskCount}</div> tasks</li>
        </ul>
      </div>
    )
  }
});

module.exports = InboxStats;
