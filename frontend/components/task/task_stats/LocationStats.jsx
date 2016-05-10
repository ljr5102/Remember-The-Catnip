var React = require('react');
var EditLocation = require('./EditLocation');
var TaskStore = require('../../../stores/task');

var LocationStats = React.createClass({
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
        <h2>{this.props.location.name}</h2>
        <EditLocation location={this.props.location}/>
        <ul>
          <li><div className="task-number">{this.state.taskCount}</div> tasks</li>
        </ul>
        <div id="map"></div>
      </div>
    )
  }
});

module.exports = LocationStats;
