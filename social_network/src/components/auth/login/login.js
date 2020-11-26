import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { LoginUser } from "../../../actions/auth";

function Login({ LoginUser, isAuthenticated }) {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = FormData;

  const ChangedValue = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const LoginSubmit = (e) => {
    e.preventDefault();
    LoginUser(email, password);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="Form_Card">
      <div className="login_container">
        <br />
        <br />
        <h1>sign into account</h1>
        <br />
        <br />
        <form className="form_class" onSubmit={(e) => LoginSubmit(e)}>
          <TextField
            className="textfield"
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => ChangedValue(e)}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => ChangedValue(e)}
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Log in
          </Button>
          <p>
            Don't have an account? <Link to="/register">Sign In</Link>
          </p>
        </form>
      </div>
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  LoginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { LoginUser })(Login);
