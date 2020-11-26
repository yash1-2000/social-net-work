import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

function AlertComponent({ alerts }) {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => 
     { return <div className='AlertComponent' key={alert.id}>
        <Alert variant="filled" severity={alert.alertType}>
          {alert.msg}
        </Alert>
        <br/>
      </div>}
    )
  );
}

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertComponent);
