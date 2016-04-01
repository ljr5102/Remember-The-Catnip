var React = require('react');
var APIUtil = require('../../utils/api_util');

var UserNew = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.newUserForm).serialize()
    APIUtil.createUser(formData);
  },

  render: function() {
    return (
      <main className="new-user group">

        <section className="promo">
          <div className="logo"></div>
          <section className="emojis group">
            <img src="#" alt="emoji" />
            <img src="#" alt="emoji" />
            <img src="#" alt="emoji" />
          </section>
          <p className="promo-quote">Join millions of people getting more organized and productive!</p>
        </section>

        <section className="sign-up group">
          <a className="sign-in-link" href="#/login">Log in</a>
          <section className="sign-up-form">
            <h1>Sign up for free.</h1>

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
