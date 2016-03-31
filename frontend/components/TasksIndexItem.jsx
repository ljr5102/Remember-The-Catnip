var React = require('react');

var TasksIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function() {
    var id = this.props.task.task_id;
    this.context.router.push("tasks/" + id)
  },

  render: function() {
    return (
      <div>
        <li className="task-index-item" onClick={this.showDetail}>{this.props.task.name}</li>
      </div>
    );
  }
});

module.exports = TasksIndexItem;
