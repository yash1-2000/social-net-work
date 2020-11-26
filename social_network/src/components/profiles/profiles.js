import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import Profileitem from "./profileitem";
import { GetAllProfiles } from "../../actions/profile";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function Profiles({ GetAllProfiles, profile: { profiles, loading } }) {
  useEffect(() => {
    GetAllProfiles();
  }, [GetAllProfiles]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? profiles
    : profiles.filter((profile) =>
        profile.user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main_container">
            <form>
              <TextField
                id="standard-basic"
                fullWidth
                label="search"
                value={searchTerm}
                onChange={handleChange}
              />
            </form>
            <br />
            <Grid container spacing={2}>
              {results.length > 0 ? (
                results.map((profile) => (
                  <Grid key={profile._id} item xs={12} sm={6}>
                    <Profileitem
                      key={profile._id}
                      profileid={profile._id}
                      profile={profile}
                    />
                  </Grid>
                ))
              ) : (
                <h4>no profile found</h4>
              )}
            </Grid>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profiles.propTypes = {
  GetAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  GetAllProfiles,
})(Profiles);
