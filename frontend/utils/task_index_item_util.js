var TaskIndexItemUtil = {
  monthText: {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
  },

  getDateText: function(date) {
    var currDate = new Date();
    var dateArray = date.split("-");
    var dateString = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
    var taskDate = new Date(dateString);
    if (currDate.getYear() === taskDate.getYear()) {
      if (currDate.getMonth() === taskDate.getMonth()) {
        if (currDate.getDate() === taskDate.getDate()) {
          return {date: "Today", klass: "task-index-date-today"};
        } else if (currDate.getDate() === taskDate.getDate() + 1) {
          return {date: "Yesterday", klass: "task-index-date-yesterday", overdue: true};
        } else if (currDate.getDate() === taskDate.getDate() - 1) {
          return {date: "Tomorrow", klass: "task-index-date-tomorrow"};
        } else {
          if (taskDate.getDate() < currDate.getDate()) {
            return {date: TaskIndexItemUtil.monthText[taskDate.getMonth()] + " " + taskDate.getDate(), klass: "task-index-date-overdue", overdue: true};
          } else {
            return {date: TaskIndexItemUtil.monthText[taskDate.getMonth()] + " " + taskDate.getDate(), klass: "task-index-date-due"};
          }
        }
      } else {
        if (taskDate.getMonth() < currDate.getMonth()) {
          return {date: TaskIndexItemUtil.monthText[taskDate.getMonth()] + " " + taskDate.getDate(), klass: "task-index-date-overdue", overdue: true};
        } else {
          return {date: TaskIndexItemUtil.monthText[taskDate.getMonth()] + " " + taskDate.getDate(), klass: "task-index-date-due"};
        }
      }
    } else {
      if (taskDate.getYear() < currDate.getYear()) {
        return {date: taskDate.getMonth() + "/" + taskDate.getDate() + "/" + (taskDate.getYear() + 1900), klass: "task-index-date-overdue", overdue: true};
      } else {
        return {date: taskDate.getMonth() + "/" + taskDate.getDate() + "/" + (taskDate.getYear() + 1900), klass: "task-index-date-due"};
      }
    }
  }
};

module.exports = TaskIndexItemUtil;
