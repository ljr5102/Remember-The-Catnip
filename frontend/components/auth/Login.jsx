var React = require('react');
var APIUtil = require('../../utils/api_util');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;

    APIUtil.login(this.state, function() {
      router.push("/tasks");
    });
  },

  guestLogin: function(e) {
    e.preventDefault();
    var router = this.context.router;
    APIUtil.login({username: "mrSmalz", password: "password"}, function() {
      router.push("/tasks");
    })
  },

  updateName: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  render: function() {
    return(
      <main className="new-session group">

        <section className="sign-in-promo">
          <div className="sign-in-logo"></div>
          <p className="sign-in-promo-quote"><q>In ancient times cats were worshipped as gods;
            they have not forgotten this.</q><br />
          -Terry Pratchet</p>
          <section className="sign-in-emojis group">
            <img src="#" alt="emoji" />
          </section>
        </section>

        <section className="sign-in group">
          <a className="sign-up-link" href="#/users/new">Sign up for free</a>
          <section className="sign-in-form">
            <h1>Log In!</h1>

            <form onSubmit={this.handleSubmit}>

                <input onChange={this.updateName} type="text" placeholder="Username" value={this.state.name} />

                <input onChange={this.updatePassword} type="password" placeholder="Password" value={this.state.password} />

                <input type="submit" className="sign-in-button" value="Log In!" />

                <input type="submit" onClick={this.guestLogin} className="sign-in-button" value="Sign in as a Guest" />
            </form>
          </section>
        </section>
      </main>

    );
  }
});

module.exports = LoginForm;
