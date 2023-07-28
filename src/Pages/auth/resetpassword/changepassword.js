import { Formik, Form, ErrorMessage } from "formik";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CustomButton } from "../../../component/button";
import { Group, InputFormik, Label } from "../../../component/formcomponent";
import * as Yup from "yup";
import { changeLogging } from "../login/login.act";
import { resetPassword } from "../login/login.ctrl";
import { withRouter } from "react-router-dom";
import { AlertNotification } from "../../../component/uicomponent";
import { Loader } from "../../../component/loader";
import { clearLocalData } from "../../../utils/getLocalData";
import ViewDisabled from "../../../assets/images/ViewDisabled@2x.svg";
import hideDisabled from "../../../assets/images/eye-View@2x.svg";


const initialVals = {
  new_password: "",
  confirm_password: "",
};
const validationLogin = Yup.object({
  new_password: Yup.string().min(8, 'New password must be at least 8 characters').required("New password is required."),
  confirm_password: Yup.string().min(8, 'Confirm password must be atleast 8 characters').required("Confirm password is required.").oneOf([Yup.ref('new_password'), null], 'Your password and confirmation password do not match.'),
});
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const email = query.get('email')
    console.log("It's email", email)
    this.state = {
      email: query.get('email').replace(/ /g, '+'),
      temppass: query.get('password'),
      errormsg: false,
      banner: false,
      loader: false,
      showPassImage: true,
      showConfirmPassImage: true
    }
  }
  renderBanner() {
    let { banner, errormsg } = this.state;
    if (banner === null) return false;
    if (banner.status === true)
      return <AlertNotification variant="success" errormessage={"Password changed successfully"} />;
    if (banner.status === false)
      return <AlertNotification variant="danger" errormessage={errormsg || "failed"} />;
  }
  render() {
    console.log("Su ave chhe", this.props.location.search);
    return (
      <div className="showroom-auth">
        <div className="d-flex">
          <div className="auth-detail no-hero-image w-100">
            <Container className="auth-wrapper p-0 d-flex align-items-center justify-content-center">
              <Row className="w-100">
                <h4 className="auth-page-title p-0">Change your password</h4>
                <Formik
                  initialValues={initialVals}
                  // onSubmit={(fields, actions) => {  
                  //   this.props.history.push("/dashboard"); 
                  // }}
                  onSubmit={async (fields, actions) => {
                    this.setState({ loader: true })
                    let { success, data } = await resetPassword(this.state.email, this.state.temppass, fields);
                    // if (success === true) {
                    //   this.props.history.push("/");
                    // } else {
                    //   this.setState({
                    //     errormsg:
                    //       (data.details && data.details.message) || data.message,
                    //   });
                    //   actions.setErrors({
                    //     email:
                    //       (data.details && data.details.message) || data.message,
                    //   });
                    // } 
                    if (success) {
                      this.setState({
                        ...this.state,
                        banner: { 'status': true },
                        errormsg: data.message,
                        loader: false
                      });
                      setTimeout(() => {
                        clearLocalData();
                        window.location.href = "/";
                      }, 2000);
                    }

                    if (success === false) {
                      this.setState({
                        ...this.state,
                        banner: { 'status': false },
                        loader: false,
                        errormsg: data.new_password ?? data.non_field_errors ?? data.url,
                      });
                    }
                  }}
                  validationSchema={validationLogin}
                >
                  {({ errors, touched }) => (
                    <Form className="w-100 p-0">
                      {this.renderBanner()}
                      <Group className="field-group mb-3" controlId="psw">
                        <Label className="common-text">New password<sup className="compulsory">*</sup></Label>
                        <div className="position-relative">
                          <InputFormik
                            type="password"
                            placeholder="Enter password"
                            className={`custom-input ${touched.new_password && errors.new_password ? "error-border" : ""}`}
                            id="new_password"
                            name="new_password"
                          />
                          <a
                            href="/"
                            className="hide-show-pass"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                document.getElementById("new_password").type === "text"
                              ) {
                                document.getElementById("new_password").type =
                                  "password";
                              } else {
                                document.getElementById("new_password").type = "text";
                              }
                              this.setState((state) => ({
                                showPassImage: !state.showPassImage,
                              }));
                            }}
                          >
                            <img
                              src={
                                this.state.showPassImage
                                  ? ViewDisabled
                                  : hideDisabled
                              }
                              // src={ViewDisabled}
                              // onClick={}
                              alt="show"
                            />
                          </a>
                        </div>
                        {!errors.new_password ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"new_password"} />
                          </div>
                        )}
                      </Group>

                      <Group className="field-group mb-3" controlId="cpsw">
                        <Label className="common-text">Confirm your new password<sup className="compulsory">*</sup></Label>
                        <div className="position-relative">
                          <InputFormik
                            type="password"
                            placeholder="Confirm Password"
                            className={`custom-input ${touched.confirm_password && errors.confirm_password ? "error-border" : ""}`}
                            id="confirm_password"
                            name="confirm_password"
                          />
                          <a
                            href="/"
                            className="hide-show-pass"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                document.getElementById("confirm_password").type === "text"
                              ) {
                                document.getElementById("confirm_password").type =
                                  "password";
                              } else {
                                document.getElementById("confirm_password").type = "text";
                              }
                              this.setState((state) => ({
                                showConfirmPassImage: !state.showConfirmPassImage,
                              }));
                            }}
                          >
                            <img
                              src={
                                this.state.showConfirmPassImage
                                  ? ViewDisabled
                                  : hideDisabled
                              }
                              // src={ViewDisabled}
                              // onClick={}
                              alt="show"
                            />
                          </a>
                        </div>
                        {!errors.confirm_password ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"confirm_password"} />
                          </div>
                        )}
                      </Group>
                      {this.state.loader ? <Loader /> : null}
                      <Group className="field-group mt-4" controlId="login">
                        <CustomButton name="Sign in" className="custom-button w-100 d-flex align-items-center justify-content-center" type="submit" />
                      </Group>
                    </Form>
                  )}
                </Formik>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return { login: (data) => dispatch(changeLogging(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));
