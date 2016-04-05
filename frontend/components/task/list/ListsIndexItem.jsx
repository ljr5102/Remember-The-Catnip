var React = require('react');

var ListsIndexItem = React.createClass({
  render: function() {
    return (
      <li>{this.props.list.name}</li>
    );
  }
});

module.exports = ListsIndexItem;
