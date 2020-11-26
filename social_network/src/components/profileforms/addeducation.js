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
import { AddEducation } from "../../actions/profile";

function Addeducation({ AddEducation, history }) {
  const [FormData, setFormData] = useState({
    school: "",
    degree: "",
    feildofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [ToggleDate, setToggleDate] = useState(false);

  const {
    school,
    degree,
    feildofstudy,
    from,
    to,
    description,
    current,
  } = FormData;

  const onChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="Form_Card">
        <div className="add_experiance_container">
          <h1>Add Education</h1>
          <form
            className="add_experiance_form_class"
            onSubmit={(e) => {
              e.preventDefault();
              AddEducation(FormData, history);
            }}
          >
            <TextField
              className="textfield"
              variant="outlined"
              required
              fullWidth
              id="school"
              label="school"
              name="school"
              value={school}
              onChange={onChange}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              required
              fullWidth
              id="degree"
              label="degree"
              name="degree"
              value={degree}
              onChange={onChange}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              fullWidth
              required
              id="feildofstudy"
              label="feildofstudy"
              name="feildofstudy"
              value={feildofstudy}
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
                  name='from'
                  value={from}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h2>to</h2>
                <TextField
                  className="textfield"
                  variant="outlined"
                  fullWidth
                  type="date"
                  id="date"
                  name="to"
                  value={to}
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
                  onChange={() =>{
                    setToggleDate(!ToggleDate)
                    setFormData({ ...FormData, current: !current })
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
              value={description}
              onChange={onChange}
              variant="outlined"
            />
            <br />
            <br />
            <div className="submit_back_profile_experiance">
              <Button type="submit" variant="contained" color="primary">
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

Addeducation.propType = {
  AddEducation: PropTypes.func.isRequired,
};

export default connect(null, { AddEducation })(withRouter(Addeducation));
