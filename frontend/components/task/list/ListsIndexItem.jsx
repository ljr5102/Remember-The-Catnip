var React = require('react');

var ListsIndexItem = React.createClass({
  render: function() {
    return (
      <li key={this.props.list.list_id}>{this.props.list.name}</li>
    );
  }
});

module.exports = ListsIndexItem;
