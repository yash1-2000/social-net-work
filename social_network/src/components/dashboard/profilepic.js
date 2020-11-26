import React, { Fragment, useState} from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import profpic from "./profpic.jpg";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { GetCurrentProfile } from "../../actions/profile";
import "./dashboard.css";
import url from "../../api"

function Profilepic({ profileid,profilepic, GetCurrentProfile }) {
  const [Image, SetImage] = useState("");
  const [submit_btn, Setsubmit_btn] = useState(true);

  // useEffect(() => {
  //   const realBtn = document.getElementById("real_btn");
  //   const customBtn = document.getElementById("custom_btn");

  //   customBtn.addEventListener("click", () => {
  //     realBtn.click();
  //     Setsubmit_btn(!submit_btn)
  //   });

  // }, []);

  const onChange = (e) => {
    SetImage(e.target.files[0]);
    // console.log(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(profileid, Image);
    Setsubmit_btn(!submit_btn);
    try {
      // await axios.post("/api/profile/upload", formData);
      await axios.post(`${url}/api/profile/upload`, formData);
    } catch (error) {
      console.log(error);
    }
    GetCurrentProfile();
  };

  const ref_btn = () => {
    const realBtn = document.getElementById("real_btn");
    // const customBtn = document.getElementById("custom_btn");

    // customBtn.addEventListener("click", () => {
    realBtn.click();
    Setsubmit_btn(!submit_btn);
    // });
  };

  const deleteProfilePic = async () => {
    try {
      // await axios.delete("/api/profile/upload");
      await axios.delete(`${url}/api/profile/upload`);
    } catch (error) {
      console.log(error);
    }
    GetCurrentProfile();
  };

  return (
    <Fragment>
      <div className="profpic">
        {profilepic ? <div className="dash_pic_container"> <img src={profilepic} alt="" /> </div> : <div className="dash_pic_container"><img src={profpic} alt="" /></div>}
        {/* <img src={profpic} alt="" /> */}
        <div className="pic_btns">
          <div style={{ display: "inline-block" }}>
            <form
              onSubmit={(e) => onSubmit(e)}
              action=""
              encType="multipart/form-data"
            >
              <div className="img_upload">
                <input
                  id="real_btn"
                  type="file"
                  name={profileid}
                  hidden="hidden"
                  onChange={(e) => onChange(e)}
                />
                <IconButton
                  onClick={() => ref_btn()}
                  id="custom_btn"
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton disabled={submit_btn} type="submit" color="primary">
                  <ArrowUpwardIcon />
                </IconButton>
              </div>
            </form>
          </div>
          <IconButton
            onClick={() => deleteProfilePic()}
            color="primary"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Fragment>
  );
}

Profilepic.propTypes = {
  profilepic:PropTypes.string,
  profileid: PropTypes.string.isRequired,
  GetCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, { GetCurrentProfile })(Profilepic);
