var React = require('react');
var Modal = require('react-modal');
var InboxStore = require('../../../stores/inbox');
var InboxActions = require('../../../actions/inbox_actions');
var TaskActions = require('../../../actions/task_actions');
var APIUtil = require('../../../utils/api_util');

var LocationsIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showTasksForLocation: function() {
    this.context.router.push("tasks")
    InboxActions.receiveClickedLocation(this.props.location)
    TaskActions.setTasksForCurrentInbox();
  },

  render: function() {
    return (
      <div>
        <li className="group" onClick={this.showTasksForLocation}>
          <div className="list-name-text">{this.props.location.name}</div>
          <strong className="badge">{this.props.location.task_count}</strong>
        </li>
      </div>
    );
  }
});

module.exports = LocationsIndexItem;
