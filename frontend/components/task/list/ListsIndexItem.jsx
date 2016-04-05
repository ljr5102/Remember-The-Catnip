var React = require('react');

var ListsIndexItem = React.createClass({
  render: function() {
    return (
      <li>
        {this.props.list.name}
        <strong className="badge">{this.props.list.task_count}</strong>
      </li>
    );
  }
});

module.exports = ListsIndexItem;
