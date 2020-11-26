import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { GetProfileById } from "../../actions/profile";
import Profiletop from "./profiletop";
import Profileeducation from "./profileeducation";
import Profilexperiance from "./profileexperiance";
import Profilegithub from "./profilegithub";

function Profile({
  GetProfileById,
  profile: { profile, loading },
  auth,
  match,
}) {
  useEffect(() => {
    GetProfileById(match.params.id);
  }, [GetProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main_container">
            <br/>
            <Link className="Link" to="/profiles">
              <Button style={{marginRight:'10px'}} size="small" variant="contained" color="primary">
                back to profiles
              </Button>
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link className="Link" to="/edit_profile">
                  <Button size="small" variant="contained" color="primary">
                    edit profile
                  </Button>
                </Link>
              )}
              <br/><br/>
            {/* <Grid container spacing={2}> */}
              <div className='Card'>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                {/* <div className='Card'> */}
                <Profiletop profile={profile} />
                {/* </div> */}
              </Grid>
              </Grid>
              </div>
            <br />
            <div className='nusta_div'>
            <div className='Card'>
              <Grid style={{padding:'15px 0' }} container spacing={2}>
                <Grid style={{borderRight:'1px gray solid' }} item xs={12} sm={6}>
                  <div className="Experiences">
                    <h1
                      style={{
                        fontSize: "2rem",
                        margin: "0",
                        fontWeight: "600",
                        color: "#11295a",
                      }}
                    >
                      education
                    </h1>
                    {profile.education.length > 0 ? (
                      <Fragment>
                        {profile.education.map((education) => (
                          <Profileeducation
                            key={education._id}
                            education={education}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No education credentials</h4>
                    )}
                  </div>
                </Grid>
             
                <Grid item xs={12} sm={6}>
                  <div className="Educations">
                    <h1
                      style={{
                        fontSize: "2rem",
                        margin: "0",
                        fontWeight: "600",
                        color: "#11295a",
                      }}
                    >
                      experiance
                    </h1>
                    {profile.experiences.length > 0 ? (
                      <Fragment>
                        {profile.experiences.map((experience) => (
                          <Profilexperiance
                            key={experience._id}
                            experience={experience}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No experience credentials</h4>
                    )}
                  </div>
                </Grid>
              </Grid>
              </div>
            </div>
            {profile.githubusername && (
              <div className="nusta_div">
                 <h2 >Github Repos</h2>
                 <div >
                 <Profilegithub username={profile.githubusername} />
                 </div>
              </div>
            )}
            <br/>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profile.propTypes = {
  GetProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { GetProfileById })(Profile);
