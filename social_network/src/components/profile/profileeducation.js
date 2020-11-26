import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";

function Profileeducation({
  education: { school, degree, feildofstudy, current, to, from, description },
}) {
  return (
    <Fragment>
      <div>
        <h3>{school}</h3>
        <h5>
          <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{" "}
          {!to ? " Now" : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
        </h5>
        <p>
          <strong>Degree: </strong> {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong> {feildofstudy}
        </p>
        <p className="description_text">
          {description}
          {/* <strong>Description: </strong> <p className="description_text">{description}</p> */}
        </p>
        <hr/>
      </div>
    </Fragment>
  );
}

Profileeducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default Profileeducation;
