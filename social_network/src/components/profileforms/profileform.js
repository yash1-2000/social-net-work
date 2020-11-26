import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./profileform.css";
import { CreateProfile, GetCurrentProfile } from "../../actions/profile";

const InitialState = {
  profession: "",
  company: "",
  website: "",
  location: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

function Profileform({
  profile: { profile, loading },
  CreateProfile,
  GetCurrentProfile,
  history,
}) {
  const [FormData, setFormData] = useState(InitialState);

  useEffect(() => {
    if (!profile) GetCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...InitialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, GetCurrentProfile, profile]);

  const {
    profession,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = FormData;

  const OnChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const SubmitProfileForm = (e) => {
    e.preventDefault();
    CreateProfile(FormData, history, profile ? true : false);
  };
  return (
    <Fragment>
      <div className="Form_Card">
        <div className="create_profile_container">
          <h1>Your Profile</h1>
          <form
            onSubmit={(e) => SubmitProfileForm(e)}
            className="profile_form_class"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfield"
                  variant="outlined"
                  required
                  fullWidth
                  label="profession"
                  name="profession"
                  value={profession}
                  onChange={(e) => OnChange(e)}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12} sm={6}>
                <TextField
                  id="company"
                  className="textfield"
                  variant="outlined"
                  fullWidth
                  label="company"
                  name="company"
                  value={company}
                  onChange={(e) => OnChange(e)}
                />
                {/* <input type="text" value={company}/> */}
              </Grid>
              <br />
              <br />
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfield"
                  variant="outlined"
                  fullWidth
                  label="location"
                  name="location"
                  value={location}
                  onChange={(e) => OnChange(e)}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfield"
                  variant="outlined"
                  fullWidth
                  label="githubusername"
                  name="githubusername"
                  value={githubusername}
                  onChange={(e) => OnChange(e)}
                />
              </Grid>
            </Grid>
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              fullWidth
              label="website"
              name="website"
              value={website}
              onChange={(e) => OnChange(e)}
            />
            <br />
            <br />
            <TextField
              className="textfield"
              variant="outlined"
              fullWidth
              label="skills"
              name="skills"
              value={skills}
              onChange={(e) => OnChange(e)}
            />
            <br />
            <br />
            <TextField
              id="bio"
              label="bio"
              name="bio"
              multiline
              fullWidth
              rows={3}
              value={bio}
              variant="outlined"
              onChange={(e) => OnChange(e)}
            />
            <br />
            <h2>Social Media</h2>
            <div className="social_media">
              <div className="social_link">
                <i className="fab fa-facebook-f fa-lg" />
                <TextField
                  className="social_url"
                  label="facebook"
                  name="facebook"
                  fullWidth
                  variant="outlined"
                  value={facebook}
                  onChange={(e) => OnChange(e)}
                />
              </div>
              <br />
              <div className="social_link">
                <i className="fab fa-youtube fa-lg" />
                <TextField
                  className="social_url"
                  label="youtube"
                  name="youtube"
                  fullWidth
                  variant="outlined"
                  value={youtube}
                  onChange={(e) => OnChange(e)}
                />
              </div>
              <br />
              <div className="social_link">
                <i className="fab fa-linkedin fa-lg" />
                <TextField
                  className="social_url"
                  label="linkedin"
                  name="linkedin"
                  fullWidth
                  variant="outlined"
                  value={linkedin}
                  onChange={(e) => OnChange(e)}
                />
              </div>
              <br />
              <div className="social_link">
                <i className="fab fa-twitter fa-lg" />
                <TextField
                  className="social_url"
                  label="twitter"
                  name="twitter"
                  fullWidth
                  variant="outlined"
                  value={twitter}
                  onChange={(e) => OnChange(e)}
                />
              </div>
              <br />
              <div className="social_link">
                <i className="fab fa-instagram fa-lg" />
                <TextField
                  className="social_url"
                  label="instagram"
                  name="instagram"
                  fullWidth
                  variant="outlined"
                  value={instagram}
                  onChange={(e) => OnChange(e)}
                />
              </div>
              <br />
            </div>
            <div className="submit_back_profile">
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

Profileform.propTypes = {
  CreateProfile: PropTypes.func.isRequired,
  GetCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { CreateProfile, GetCurrentProfile })(
  withRouter(Profileform)
);
// export default connect( mapStateToProps ,{CreateProfile,GetCurrentProfile})(Profileform);
// export default connect(mapStateToProps, { GetCurrentProfile })(Profileform);
