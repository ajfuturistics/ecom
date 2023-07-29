import React, { useEffect, useState } from "react";
import "./forgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPasswordUser,
} from "../../redux/Actions/userActions";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPasswordUser(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
