var React = require('react');
var APIUtil = require('../../utils/api_util');

var UserNew = React.createClass({
  getInitialState: function() {
    return {errors: []};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.newUserForm).serialize()
    APIUtil.createUser(formData, this.displayErrors);
  },

  displayErrors: function(err_table) {
    this.setState({errors: err_table})
  },

  render: function() {
    var errors;
    if (this.state.errors.length > 0) {
      errors = <div className="error-alert">
                <div className="error-alert-img"></div>
                <ul>
                  {this.state.errors.map(function(el) {
                    if (el.split(" ").indexOf("digest") !== -1) {
                      return <li>Password can't be blank</li>
                    } else {
                      return <li>{el}</li>
                    }
                  })}
                </ul>
               </div>
    }
    return (
      <main className="new-user group">

        <section className="promo">
          <div className="logo"></div>
          <section className="emojis group">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Emoji_u1f408.svg/2000px-Emoji_u1f408.svg.png" alt="emoji" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Emoji_u1f408.svg/2000px-Emoji_u1f408.svg.png" alt="emoji" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Emoji_u1f408.svg/2000px-Emoji_u1f408.svg.png" alt="emoji" />
          </section>
          <p className="promo-quote">Join millions of people getting more organized and productive!</p>
        </section>

        <section className="sign-up group">
          <a className="sign-in-link" href="#/login">Log in</a>
          <section className="sign-up-form">
            <h1>Sign up for free.</h1>
            {errors}

            <form ref="newUserForm" onSubmit={this.handleSubmit}>
                <input type="text" name="user[username]" placeholder="Username" />

                <input type="text" name="user[email_address]" placeholder="Email" />

                <input type="password" name="user[password]" placeholder="Password" />

                <input className="sign-up-button" type="submit" value="Sign Up!" />

            </form>
          </section>
        </section>
      </main>

    );
  }
});

module.exports = UserNew;
