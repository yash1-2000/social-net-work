import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./profileitem.css";
import Button from "@material-ui/core/Button";

function Profileitem({
  profile: {
    profilepic,
    user: { _id, name, avatar },
    company,
    skills,
    profession,
  },
}) {
  return (
    <Fragment>
      <div className="Card">
        <div className="profile_item">
          <div className="img_name">
            {/* <img style={{ borderRadius: "50%" }} src={avatar} /> */}
            {profilepic ? (
              <div className="prof_pic_container">
                <img src={profilepic} alt="" />
              </div>
            ) : (
              <div className="prof_pic_container">
                <img src={avatar} alt="" />
              </div>
            )}
            <h2>{name}</h2>
          </div>
          <hr />
          <div className="other_info">
            <h4>{profession}</h4>
            <h4>{company && <span> {company} </span>}</h4>
            <ul>
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index}>
                  <h4>{skill}</h4>
                </li>
              ))}
            </ul>
          </div>
          <Link className="Link" to={`/profile/${_id}`}>
            <Button size="small" variant="contained" color="primary">
              visit profile
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Profileitem;
