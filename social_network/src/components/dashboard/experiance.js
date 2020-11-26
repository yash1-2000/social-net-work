import React, { Fragment } from "react";
import "./dashboard.css";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { DeleteExperiance } from "../../actions/profile";

function Experience({ experience, DeleteExperiance }) {
  return (
    <Fragment>
      {experience.length === 0 ? null : (
        <div>
          <h1
            style={{
              fontSize: "2rem",
              margin: "13px 0 0 0",
              fontWeight: "600",
              color: "#11295a",
            }}
          >
            experiance
          </h1>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginTop: "15px" }}>
             
              <div key={exp._id} className="Card">
                <div className="dashboard_profile">
                  <br />
                  <h4>title</h4>
                  <h3>{exp.title}</h3>
                  <hr />
                  <h4>company</h4>
                  <h3>{exp.company}</h3>
                  <hr />
                  <h4>location</h4>
                  <h3>{exp.location}</h3>
                  <hr />
                  <h4>duration</h4>
                  <h3>
                    <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment>{" "}
                    -{" "}
                    {exp.current ? (
                      "current"
                    ) : (
                      <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
                    )}
                  </h3>
                  <hr />
                  <h4>description</h4>
                  <div className="description">
                  <p>{exp.description}</p>
                  </div>
                  <br />
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={()=>DeleteExperiance(exp._id)}
                  >
                    delete
                  </Button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  DeleteExperiance: PropTypes.func.isRequired,
};

export default connect(null, { DeleteExperiance })(Experience);
