import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { RegisterUser } from "../../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import "./register.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function Register({ setAlert, RegisterUser, isAuthenticated }) {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = FormData;

  const ChangedValue = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const SubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      console.log("enter proper password");
      setAlert("enter proper password", "error");
    } else {
      RegisterUser({ name, email, password });
    }
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="Form_Card">
        <div className="register_container">
          <h1>create account</h1>
          <br/>
          <form action="submit" onSubmit={SubmitForm} className="form_class">
            <TextField
              name="name"
              variant="outlined"
              required
              fullWidth
              label="name"
              autoComplete="off"
              onChange={(e) => ChangedValue(e)}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              required
              fullWidth
              label="email"
              name="email"
              autoComplete="off"
              onChange={(e) => ChangedValue(e)}
            />
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => ChangedValue(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  // required
                  fullWidth
                  name="confirm_password"
                  label="confirm_Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => ChangedValue(e)}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary">
              register
            </Button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  RegisterUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, RegisterUser })(Register);
