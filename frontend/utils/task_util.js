var APIUtil = require('./api_util');

var TaskUtil = {
  parseTaskInput: function(input) {
    var specialChars = ["*", "^", "#"];
    var inputArray = input.split(" ");
    var task = {};
    var taskName = "";
    inputArray.forEach(function(char) {
      if (specialChars.indexOf(char[0]) === -1) {
        taskName = taskName + char + " ";
      } else {
        console.log("This character is special!!!");
      }
    });
    task.name = $.trim(taskName);
    APIUtil.createTask(task);
  }
};

module.exports = TaskUtil;
