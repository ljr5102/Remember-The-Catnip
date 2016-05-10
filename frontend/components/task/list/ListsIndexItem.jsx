var React = require('react');
var APIUtil = require('../../../utils/api_util');
var InboxActions = require('../../../actions/inbox_actions');
var TaskActions = require('../../../actions/task_actions');
var InboxStore = require('../../../stores/inbox');

var ListsIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showTasksForList: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedList(this.props.list);
    TaskActions.setTasksForCurrentInbox();
  },

  render: function() {
    return (
      <div>
        <li className="group" onClick={this.showTasksForList}>
          <div className="list-name-text">{this.props.list.name}</div>
          <strong className="badge">{this.props.list.task_count}</strong>
        </li>
      </div>
    );
  }
});

module.exports = ListsIndexItem;
