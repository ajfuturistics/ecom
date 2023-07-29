import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  resetPasswordUser,
  clearErrors,
} from "../../redux/Actions/userActions";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPasswordUser(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");

      history.push("/login");
    }
  }, [dispatch, alert, error, history, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Conform Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
