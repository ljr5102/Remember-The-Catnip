var React = require('react');
var EditList = require('./EditList');
var TaskStore = require('../../../stores/task');

var ListStats = React.createClass({
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
    return (
      <div className="task-statistics">
        <h2>{this.props.list.name}</h2>
        <EditList list={this.props.list}/>
        <ul>
          <li><div className="task-number">{this.state.taskCount}</div> tasks</li>
        </ul>
      </div>
    )
  }
});

module.exports = ListStats;
