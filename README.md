# Remember The Catnip

**Remember The Catnip** is a single-page web-application, inspired by **Remember The Milk**, for the organization and recording of tasks/reminders. Remember The Catnip was built using **Ruby on Rails** on the back-end, and uses **React.js** with **Flux** for the front-end.

Explore and Get Organized at [rememberthecatnip.com](http://www.rememberthecatnip.com)

---

## Log-In
![login](/docs/screenshots/login.png)

## Sign-Up
![sign-up](/docs/screenshots/signup.png)

## Tasks Index
![index](/docs/screenshots/tasksindex.png)

## Task Detail
![detail](/docs/screenshots/taskdetail.png)

---
## Features
 * Sign-Up, Sign-In with Username
 * Sign-In with Facebook
 * Create Tasks
 * Create Lists
 * Create Locations
 * Mark Tasks Complete
 * Search Tasks

---
## Technical Details
 * Remember The Catnip incorporates a dynamic task form that responds in real-time.  It achieves this through a React onChange event and with DOM manipulation via jQuery.  Here's a look at the new task form:

```
{
  <form className="task-new group" onInput={this.toggleButtons} onSubmit={this.createTask}>
}

```

* Here is a look at the toggleButtons function.  It checks for what the input currently is and adds/removes CSS classes where necessary.

```
{
  toggleButtons: function() {
    if ($(".task-new-name-input").val() === "") {
      $(".show-button").removeClass("show-button").addClass("hidden-button");
      $(".task-form-show").removeClass("task-form-show").addClass("task-form-hidden")
      $(".task-new-name-input").removeClass("task-new-name-input").addClass("task-new-name-no-input")
    } else {
      $(".hidden-button").removeClass("hidden-button").addClass("show-button");
      $(".task-new-name-no-input").removeClass("task-new-name-no-input").addClass("task-new-name-input")
    }
  }
}
```
* Lots of classes being removed and added depending on the scenario due to how the form collapses and expands.  This makes the tasks index more readable because the form is not constantly expanded showing all these fields that are not even required for task submission.  The dynamic nature of this form allows for only showing task related input when a user is physically creating a new task.

---
## Todo
 - [ ] Implement light error handling on the front end
 - [ ] Add Tags for Tasks
 - [ ] Add Notes for Tasks
 - [ ] Add Notifications for Users
 - [ ] Allow for Adding Contacts and Sharing of Tasks
 - [ ] Add Reminders for Tasks
 - [ ] Add Subtasks
 - [ ] Allow for Recurring Tasks

---
[Initial Documentation](/docs/README.md)
