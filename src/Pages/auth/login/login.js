import { Formik, Form, ErrorMessage } from "formik";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CustomButton } from "../../../component/button";
import { Group, InputFormik, Label, CheckBox } from "../../../component/formcomponent";
import * as Yup from "yup";
import { changeLogging } from "./login.act";
import { loginToAccount } from "./login.ctrl";
import { withRouter } from "react-router-dom";
// import AuthPlaceholder from "../../../assets/images/auth-placeholder.png";
import ViewDisabled from "../../../assets/images/ViewDisabled@2x.svg";
import hideDisabled from "../../../assets/images/eye-View@2x.svg";
import { AuthHeader } from "../../../component/header/header";
import { AlertNotification } from "../../../component/uicomponent";
import Cookies from "js-cookie";
import { Loader } from "../../../component/loader";
import { clearLocalData } from "../../../utils/getLocalData";

const initialVals = {
  email: "",
  password: "",
};
const validationLogin = Yup.object({
  email: Yup.string().email("Email address is not valid.").required("Email address is required."),
  password: Yup.string().min(8, "8 characters must be required.").required("Password is required."),
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: null,
      msg: null,
      loggedIn: true,
      showPassImage: true,
      loading: false,
      isChecked: false,
      loader: false
    };
    // this.props.login(true);
    // console.log(this.props.auth.loggedIn);
  }
  componentWillMount = async () => {
    if (this.props.history.location.state !== undefined) {
      this.setState({ banner: { 'status': true }, msg: this.props.history.location.state.message });
      this.props.history.location.state.message = undefined;
    }
    // await clearLocalData();
    const token = localStorage.getItem("showroomAccess");
    (token == null || undefined) && this.setState({ loggedIn: false, errormsg: false });
  }
  renderBanner() {
    let { banner, msg } = this.state;
    if (banner === null) return false;
    if (banner.status === true)
      return <AlertNotification variant="success" errormessage={msg} />;
    if (banner.status === false)
      return <AlertNotification variant="danger" errormessage={msg} />;
  }
  render() {
    // if (this.state.loggedIn) {
    //   this.props.history.push("/");
    // }
    return (
      <div className="showroom-auth">
        <div className="d-flex">
          <div className="auth-placeholder">
            {/* <img src={AuthPlaceholder} alt="Auth-placeholder" /> */}
          </div>
          <div className="auth-detail">
            <AuthHeader headercontent="New to Showroom?" onClick={() => this.props.history.push("/create-account")} headeraction="Sign Up" />
            <Container className="auth-wrapper p-0 d-flex align-items-center justify-content-center">
              <Row className="w-100">
                <h4 className="auth-page-title p-0">Welcome back</h4>
                <Formik
                  initialValues={initialVals}
                  onSubmit={async (fields, actions) => {

                    this.setState({
                      loader: true,
                      banner: { 'status': true },
                      msg: "Login Successfully..."
                    })

                    let { success, data } = await loginToAccount("login", fields);
                    console.log(success, data);

                    if (success === false) {
                      this.setState({
                        loader: false,
                        banner: { 'status': false },
                        msg: (data.details && data.details.error) || data.error || data.message || data,
                      })
                      await clearLocalData();
                      // window.location.href = "/";
                    } else {
                      if (success) {
                        if (this.state.isChecked === true) {
                          Cookies.set('isKeepLogin', true)
                          this.setState({ loggedIn: true });
                          Cookies.set("loggedIn", true);
                        } else {
                          this.setState({ loggedIn: true });
                          var date = new Date();
                          var minutes = 720;
                          date.setTime(date.getTime() + (minutes * 60 * 1000));
                          Cookies.set("loggedIn", true, { expires: date, path: '/' });
                        }

                        Cookies.remove("onBoardingStep");
                        this.props.history.push("/dashboard");
                      } else {
                        this.setState({
                          banner: { 'status': false },
                          msg: (data.details && data.details.error) || data.error || data,
                        });
                      }
                    }
                  }}
                  validationSchema={validationLogin}
                >
                  {({ errors, touched }) => (
                    <Form className="w-100 p-0">
                      {this.renderBanner()}
                      <Group className="field-group mb-3" controlId="unm">
                        <Label className="common-text">Email<sup className="compulsory">*</sup></Label>
                        <InputFormik
                          type="email"
                          placeholder="xyz@domain.com"
                          className={`custom-input ${touched.email && errors.email ? "error-border" : ""}`}
                          id="email"
                          name="email"
                        />
                        {!errors.email ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"email"} />
                          </div>
                        )}
                      </Group>

                      <Group className="field-group mb-3" controlId="psw">
                        <Label className="common-text">Password<sup className="compulsory">*</sup></Label>
                        <div className="position-relative">
                          <InputFormik
                            type="password"
                            placeholder="Enter Password"
                            className={`custom-input ${touched.password && errors.password ? "error-border" : ""}`}
                            id="password"
                            name="password"
                          />
                          <a
                            href="/"
                            className="hide-show-pass"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                document.getElementById("password").type === "text"
                              ) {
                                document.getElementById("password").type =
                                  "password";
                              } else {
                                document.getElementById("password").type = "text";
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
                        {!errors.password ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"password"} />
                          </div>
                        )}
                      </Group>
                      <Group className="field-group" controlId="login">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <CheckBox type="checkbox" onChange={() => this.setState({ isChecked: !this.state.isChecked })} />
                            <span className="common-text mx-2">Keep me signed in</span>
                          </div>
                          <span className="common-text border-bottom c-pointer" onClick={() => this.props.history.push("/reset-password")}>Forgot password?</span>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
