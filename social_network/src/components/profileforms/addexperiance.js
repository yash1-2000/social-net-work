import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./addexperiance.css";
import { AddExperiance } from "../../actions/profile";

function Addexperiance({ AddExperiance, history }) {
  const [FormData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [ToggleDate, setToggleDate] = useState(false);
  const { company, title, location, from, to, current, description } = FormData;
  // const {current} = FormData;

  const onChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="Form_Card">
        <div className="add_experiance_container">
          <h1>Add Experience</h1>
          <form
            className="add_experiance_form_class"
            onSubmit={(e) => {
              e.preventDefault();
              // console.log(FormData)
              AddExperiance(FormData, history);
            }}
          >
            <TextField
              className="textfield"
              variant="outlined"
              required
              fullWidth
              label="title"
              name="title"
              defaultValue={title}
              onChange={onChange}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              required
              fullWidth
              id="company"
              label="company"
              name="company"
              defaultValue={company}
              onChange={onChange}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              fullWidth
              id="location"
              label="location"
              name="location"
              defaultValue={location}
              onChange={onChange}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <h2>from</h2>
                <TextField
                  className="textfield"
                  variant="outlined"
                  required
                  fullWidth
                  type="date"
                  name="from"
                  defaultValue={from}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h2>to</h2>
                <TextField
                  disabled={ToggleDate}
                  className="textfield"
                  variant="outlined"
                  fullWidth
                  type="date"
                  id="date"
                  name="to"
                  defaultValue={to}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  onChange={() => {
                    setToggleDate(!ToggleDate);
                    setFormData({ ...FormData, current: !current });
                  }}
                />
              }
              label="current"
            />
            <br />
            <br />
            <TextField
              id="description"
              label="description"
              name="description"
              multiline
              fullWidth
              rows={3}
              variant="outlined"
              defaultValue={description}
              onChange={onChange}
            />
            <br />
            <br />
            <div className="submit_back_profile_experiance">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Link className="Link" to="/dashboard">
                <Button variant="contained">Back</Button>
              </Link>
            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

Addexperiance.propType = {
  AddExperiance: PropTypes.func.isRequired,
};

export default connect(null, { AddExperiance })(withRouter(Addexperiance));
