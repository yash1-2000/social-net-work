import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./landing.css";
import Button from "@material-ui/core/Button";

function Landing({ isAuthenticated }) {
  console.log(isAuthenticated)
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="landing_component">
        <h1>Welcome to social net</h1>
        <div className="signin_login">
          <Link className="Link" to="/register">
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </Link>
          <Link className="Link" to="/login">
            <Button variant="contained" color="secondary">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
