var React = require('react');
var InboxStore = require('../../../stores/inbox');
var InboxStats = require('./InboxStats');
var ListStats = require('./ListStats');
var LocationStats = require('./LocationStats');

var TaskStats = React.createClass({
  getInitialState: function() {
    return {inbox: InboxStore.getCurrentItem()};
  },

  componentDidMount: function() {
    this.listenerToken = InboxStore.addListener(this.updateState);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  updateState: function() {
    this.setState({inbox: InboxStore.getCurrentItem()});
  },

  render: function() {
    if(typeof this.state.inbox === "string") {
      return (
        <InboxStats inbox={this.state.inbox}/>
      )
    } else if (this.state.inbox.list_id) {
      return (
        <ListStats list={this.state.inbox} />
      )
    } else if (this.state.inbox.location_id) {
      return (
        <LocationStats location={this.state.inbox} />
      )
    }
  }
});

module.exports = TaskStats;
