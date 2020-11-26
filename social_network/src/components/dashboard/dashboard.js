import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import "./dashboard.css";
import Experience from "./experiance";
import Education from "./education";
import Profilepic from "./profilepic";

// actions
import { GetCurrentProfile, DeleteAccount } from "../../actions/profile";

function Dashboard({
  GetCurrentProfile,
  DeleteAccount,
  auth: { user },
  profile: { profile, loading },
}) {
  useEffect(() => {
    GetCurrentProfile();
  }, [GetCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="welcome">
        <h3>welcome {user && user.name}</h3>
      </div>
      <div className="main_container">
        {profile !== null ? (
          <Fragment>
            <Profilepic
              profileid={profile._id}
              profilepic={profile.profilepic}
            />
            <br />
            <div className="submit_back_dashboard">
              <Link className="Link" to="/edit_profile">
                <Button type="submit" variant="contained" color="primary">
                  edit
                </Button>
              </Link>
              <Link className="Link" to="/add_experiance">
                <Button type="submit" variant="contained" color="primary">
                  + experiance
                </Button>
              </Link>
              <Link className="Link" to="/add_education">
                <Button type="submit" variant="contained" color="primary">
                  + education
                </Button>
              </Link>
              <Link className="Link" to="/userposts">
                <Button type="submit" variant="contained" color="primary">
                  + post
                </Button>
              </Link>
            </div>
            <br />
            {
              profile.bio ? <div className="bio">
                <h3 style={{margin:'0'}}>bio</h3>
                {profile.bio}
              </div> : null
            }
            <br/>
            <div className="Card">
              <div className="dashboard_profile">
                <br />
                <h4>company</h4>
                <h3>{profile.company}</h3>
                <hr />
                <h4>website</h4>
                <h3>{profile.website}</h3>
                <hr />
                <h4>location</h4>
                <h3>{profile.location}</h3>
                <hr />
                <h4>profession</h4>
                <h3>{profile.profession}</h3>
                <hr />
                <h4>skills</h4>
                <ul>
                  {
                    profile.skills.map(skill => (
                      <li key={skill}>{skill}</li>
                    ))
                  }
                </ul>
                {profile.social ? (
                  <div>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        margin: "15px 0",
                        fontWeight: "500",
                        color: "#a90202",
                      }}
                    >
                      social media
                    </h2>
                    <h5>facebook</h5>
                    <h4>{profile.social.facebook}</h4>
                    <hr />
                    <h5>twitter</h5>
                    <h4>{profile.social.twitter}</h4>
                    <hr />
                    <h5>linkedin</h5>
                    <h4>{profile.social.linkedin}</h4>
                    <hr />
                    <h5>instagram</h5>
                    <h4>{profile.social.instagram}</h4>
                  </div>
                ) : null}
              </div>
              <br />
            </div>
            <Experience experience={profile.experiences} />
            <Education education={profile.education} />
            <br />
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={() => DeleteAccount(profile._id)}
            >
              Delete account
            </Button>
            <br />
          </Fragment>
        ) : (
          <Fragment>
            <Link className="Link" to="/create_profile">
              <Button type="submit" variant="contained" color="primary">
                create profile
              </Button>
            </Link>
          </Fragment>
        )}
        <br />
      </div>
    </Fragment>
  );
}

Dashboard.propTypes = {
  GetCurrentProfile: PropTypes.func.isRequired,
  DeleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  GetCurrentProfile,
  DeleteAccount,
})(Dashboard);
