var TaskStore = require('../../../stores/task');
var InboxStore = require('../../../stores/inbox');
var APIUtil = require('../../../utils/api_util');
var TaskActions = require('../../../actions/task_actions');
var InboxActions = require('../../../actions/inbox_actions');

var React = require('react');

var AllTasks = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {allTasks: []};
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateState);
    // APIUtil.getAllTasks(this.updateState);

  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getAllNewTasks: function() {
    // APIUtil.getAllTasks(this.updateState);
    TaskStore.getAllTasks();
  },

  updateState: function() {
    this.setState({allTasks: TaskStore.getAllTasks()});
  },

  updateStore: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedInbox("AllTasks");
    TaskActions.setStore(this.state.allTasks);
  },

  render: function() {
    var taskStats = gatherTaskStats(this.state.allTasks);
    return (
      <div>
        <li className="group" onClick={this.updateStore}>
          All Tasks <strong className="badge">{this.state.allTasks.length}</strong>
        </li>
        {taskStats}
      </div>
    );
  }

});


function gatherTaskStats(allTasks) {
  var allowedInboxes = ["AllTasks", ""];
  var taskStats;
  if (allowedInboxes.indexOf(InboxStore.getCurrentInbox()) !== -1) {
    taskStats = <div className="task-statistics">
                  <h2>All Tasks</h2>
                  <ul>
                    <li><div className="task-number">{allTasks.length}</div> tasks</li>
                  </ul>
                </div>
  } else {
    taskStats = <div></div>
  };
  return taskStats;
};

module.exports = AllTasks;
