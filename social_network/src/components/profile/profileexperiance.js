import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";

function Profilexperiance({
    experience: { company, title, location, current, to, from, description  },
}) {
  return (
    <Fragment>
     <div>
    <h3>{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
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

Profilexperiance.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Profilexperiance;
