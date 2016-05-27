var React = require('react');
var TaskIndexItemUtil = require('../../utils/task_index_item_util');

var TasksIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function() {
    var id = this.props.task.task_id;
    if (this.props.task.completed) {
      this.context.router.push("tasks/completed/" + id)
    } else {
      this.context.router.push("tasks/" + id)
    }
  },

  render: function() {
    var taskDate, taskTitle, dateText;
    if (this.props.task.due_date) {
      dateText = TaskIndexItemUtil.getDateText(this.props.task.due_date);
      taskDate = <span className={dateText.klass}>{dateText.date}</span>
    }
    if (dateText && dateText.overdue) {
      taskTitle = <span className="task-index-item-title-overdue">{this.props.task.name}</span>
    } else {
      taskTitle = <span className="task-index-item-title">{this.props.task.name}</span>
    }
    return (
      <div className="group">
        <li className="task-index-item group" onClick={this.showDetail}>
          {taskTitle}
          {taskDate}
        </li>
      </div>
    );
  }
});

module.exports = TasksIndexItem;
