import React, { Fragment } from "react";
import "./dashboard.css";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { DeleteEducation } from "../../actions/profile";

function Education({ education, DeleteEducation }) {
  return (
    <Fragment>
      {education.length === 0 ? null : (
        <div>
          <h1
            style={{
              fontSize: "2rem",
              margin: "13px 0 0 0",
              fontWeight: "600",
              color: "#11295a",
            }}
          >
            education
          </h1>
          {education.map((exp) => (
            <div key={exp._id} style={{ marginTop: "15px" }}>
             
              <div key={exp._id} className="Card">
                <div className="dashboard_profile">
                  <br />
                  <h4>school</h4>
                  <h3>{exp.school}</h3>
                  <hr />
                  <h4>degree</h4>
                  <h3>{exp.degree}</h3>
                  <hr />
                  <h4>field of study</h4>
                  <h3>{exp.feildofstudy}</h3>
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
                    onClick={()=>DeleteEducation(exp._id)}
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

Education.propTypes = {
  education: PropTypes.array.isRequired,
  DeleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { DeleteEducation })(Education);
