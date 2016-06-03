var React = require('react');
var InboxStore = require('../../../stores/inbox');
var TaskStore = require('../../../stores/task');

var InboxStats = React.createClass({
  getInitialState: function() {
    return({taskCount: TaskStore.all().length})
  },

  drawChart: function() {
    if(document.getElementById('chart_div')) {
      var noDate = 0;
      var today = 0;
      var tomorrow = 0;
      var overdue = 0;
      var later = 0;
      var currDate = new Date();
      var displayedTasks = TaskStore.all();
      displayedTasks.forEach(function(task) {
        if (task.today) {
          today += 1;
        } else if (task.tomorrow) {
          tomorrow += 1;
        } else if (!task.due_date) {
          noDate += 1;
        } else {
          var taskDate = new Date(task.due_date)
          if (taskDate < currDate) {
            overdue += 1;
          } else {
            later += 1;
          }
        }
      });

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Due Date');
      data.addColumn('number', 'Tasks');
      data.addRows([
        ['No Date', noDate],
        ['Today', today],
        ['Tomorrow', tomorrow],
        ['Overdue', overdue],
        ['Later', later],
      ]);

      // Set chart options
      var options = {
        'legend':{alignment: 'center'},
        'chartArea':{left: 150, top: 10, height: 160},
        'titleTextStyle': {fontSize: "16", bold: "false"},
        'width':400,
        'height':200,
        'backgroundColor':'#e4eef8',
        'colors':['lightgray','orange','yellow','red','green']
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateCount);
    google.charts.setOnLoadCallback(this.drawChart);
    !function(d,s,id){
      debugger
      var js, fjs=d.getElementsByTagName(s)[0], p=/^http:/.test(d.location)?'http':'https';
      // if(!d.getElementById(id)){
        debugger
        js=d.createElement(s);js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      // }
    }(document,"script","twitter-wjs");
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  renderGraphics: function() {
    google.charts.setOnLoadCallback(this.drawChart);
    !function(d,s,id){
      debugger
      var js, fjs=d.getElementsByTagName(s)[0], p=/^http:/.test(d.location)?'http':'https';
      // if(!d.getElementById(id)){
        debugger
        js=d.createElement(s);js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      // }
    }(document,"script","twitter-wjs");
  },

  updateCount: function() {
    this.setState({taskCount: TaskStore.all().length}, this.renderGraphics);
  },

  render: function() {
    var name;
    if (this.props.inbox === "AllTasks") {
      name = "All Tasks";
    } else {
      name = this.props.inbox
    }
    return (
      <div className="task-statistics">
        <h2>{name}</h2>
        <ul>
          <li><div className="task-number">{this.state.taskCount}</div> tasks</li>
        </ul>
        <h3 className="chart-title">Tasks Breakdown</h3>
        <div id="chart_div"></div>
        <div className="twitter-container">
          <a className="twitter-timeline"  href="https://twitter.com/rembrthecatnip" data-widget-id="738862280486621184">Tweets by @rembrthecatnip</a>
        </div>
      </div>
    )
  }
});

module.exports = InboxStats;
