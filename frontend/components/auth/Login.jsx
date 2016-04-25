var React = require('react');
var APIUtil = require('../../utils/api_util');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;
    if (this.state.username === "") {
      this.setState({error: "Username cannot be blank."})
    } else if (this.state.password === "") {
      this.setState({error: "Password cannot be blank."})
    } else {
      APIUtil.login(this.state, this.displayError);
    }
  },

  displayError: function() {
    this.setState({username: "", password: "", error: "Invalid username or password."})
  },

  guestLogin: function(e) {
    e.preventDefault();
    var router = this.context.router;
    APIUtil.login({username: "mrSmalz", password: "password"}, function() {
      router.push("/tasks");
    });
  },

  updateName: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  render: function() {
    var errors;
    if (this.state.error !== "") {
      errors = <div className="error-alert">
                <div className="error-alert-img"></div>
                {this.state.error}
               </div>
    }
    return(
      <main className="new-session group">

        <section className="sign-in-promo">
          <div className="sign-in-logo"></div>
          <p className="sign-in-promo-quote"><q>In ancient times cats were worshipped as gods;
            they have not forgotten this.</q><br />
          -Terry Pratchet</p>
          <section className="sign-in-emojis group">
            <img src="http://3.bp.blogspot.com/-ZrIwoH6g36U/UsfI4ZaJM-I/AAAAAAAAJTY/qj7z8PaXG0g/s1600/Pusheen04.png" alt="emoji" />
          </section>
        </section>

        <section className="sign-in group">
          <a className="sign-up-link" href="#/users/new">Sign up for free</a>
          <section className="sign-in-form">
            <h1>Log In!</h1>
            {errors}

            <form onSubmit={this.handleSubmit}>

                <input onChange={this.updateName} type="text" placeholder="Username" value={this.state.username} />

                <input onChange={this.updatePassword} type="password" placeholder="Password" value={this.state.password} />

                <input type="submit" className="sign-in-button" value="Log In!" />

                <input type="submit" onClick={this.guestLogin} className="sign-in-button" value="Sign in as a Guest" />

                <a href="/auth/facebook" className="sign-in-button">Sign in with Facebook</a>
            </form>
          </section>
        </section>
      </main>

    );
  }
});

module.exports = LoginForm;
