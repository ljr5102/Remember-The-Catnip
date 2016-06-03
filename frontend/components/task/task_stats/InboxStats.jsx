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
      var options = {'title':'Task Breakdown',
        'width':400,
        'height':300,
        'backgroundColor':'#e4eef8',
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  },

  componentDidMount: function() {
    this.listenerToken = TaskStore.addListener(this.updateCount);
    google.charts.setOnLoadCallback(this.drawChart);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  updateCount: function() {
    this.setState({taskCount: TaskStore.all().length}, google.charts.setOnLoadCallback(this.drawChart));
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
        <div id="chart_div"></div>
      </div>
    )
  }
});

module.exports = InboxStats;
