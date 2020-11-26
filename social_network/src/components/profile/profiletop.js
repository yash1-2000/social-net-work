import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./profile.css";

function Profiletop({
  profile: {
    skills,
    bio,
    _id,
    profilepic,
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  return (
    <Fragment>
      <div>
        <div className="profile_top">
          <div className="pic_name">
            {profilepic ? (
              <div className="pic_container"> <img src={profilepic} alt="" /></div>
            ) : (
              <div className="pic_container">  <img src={avatar} alt="" /></div>
             
            )}
            <h1>{name}</h1>
          </div>
          <hr/>
          <div style={{textAlign:"justify"}}>
            <p className="description_text"> {bio} </p>
          </div>
          <h4>{status}</h4>
          <h4>company - {company}</h4>
          <h4>location - {location}</h4>
          <h4>website - <a href={website}>{website}</a></h4>
          <div className="skills">
            <ul>
            {skills.map((skill, index) => (
              <li key={index} >
                {skill}
              </li>
            ))}
            </ul>
          </div>
          {social ? <div className="social_links">
          <a href={social.facebook}><i className="fab fa-facebook"></i></a>
          <a href={social.twitter}><i className="fab fa-twitter"></i></a>
          <a href={social.linkedin}><i className="fab fa-linkedin"></i></a>
          <a href={social.instagram}><i className="fab fa-instagram"></i></a>
          </div> : null}
        </div>
      </div>
    </Fragment>
  );
}

Profiletop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profiletop;