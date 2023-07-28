import { ErrorMessage, Form, Formik } from "formik";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../../../component/button";
import { Group, InputFormik, Label, FormikCheckBox } from "../../../component/formcomponent";
import * as Yup from "yup";
// import AuthPlaceholder from "../../../assets/images/auth-placeholder.png";
import { AuthHeader } from "../../../component/header/header";
import { withRouter } from 'react-router-dom';
import ViewDisabled from "../../../assets/images/ViewDisabled@2x.svg";
import hideDisabled from "../../../assets/images/eye-View@2x.svg";
import { createStoreOwner } from "../login/login.ctrl";
import { AlertNotification } from "../../../component/uicomponent";
import { Loader } from "../../../component/loader";
import Cookies from "js-cookie";

const initialVals = {
  email: "",
  password: "",
  name: "",
  terms: false
};

const validationLogin = Yup.object({
  name: Yup.string().required("Name is required.").min(3, 'Name must be at least 3 characters.').max(20, 'Name must be at most 20 characters.').matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
  email: Yup.string().email("Email address is not valid.").required("Email address is required."),
  password: Yup.string().min(8, "8 characters must be required.").required("Password is required."),
  password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required').required('Accept Terms & Conditions is required')
});

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassImage: true,
      terms: false,
      errormsg: false,
      banner: false,
      loader: false
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  renderBanner() {
    let { banner, errormsg } = this.state;
    if (banner === null) return false;
    if (banner.status === true)
      return <AlertNotification variant="success" errormessage={"Successfully registered"} />;
    if (banner.status === false)
      return <AlertNotification variant="danger" errormessage={errormsg.email || errormsg.password || "failed"} />;
  }
  handleChecked() {
    // console.log('handle before',this.state.isChecked);
    this.setState({ isChecked: !this.state.isChecked });
    // console.log('handle after ',this.state.isChecked);
  }
  render() {
    return (
      <div className="showroom-auth">
        <div className="d-flex">
          <div className="auth-placeholder">
            {/* <img src={AuthPlaceholder} alt="Auth-placeholder" /> */}
          </div>
          <div className="auth-detail">
            <AuthHeader headercontent="Have an account?" onClick={() => this.props.history.push("/")} headeraction="Sign In" />
            <Container className="auth-wrapper p-0 d-flex align-items-center justify-content-center">
              <Row className="w-100">
                <h4 className="auth-page-title p-0">Create your account</h4>
                <Formik
                  initialValues={initialVals}
                  onSubmit={async (fields, actions) => {
                    this.setState({ loader: true });
                    let { error, data } = await createStoreOwner(fields);
                    debugger;
                    if (error.email !== '' || error.password !== '') {
                      this.setState({
                        ...this.state,
                        banner: { 'status': false },
                        errormsg: error,
                        loader: false
                      });
                    }
                    if (data.user) {
                      this.setState({
                        ...this.state,
                        banner: { 'status': true },
                        loader: false
                      });
                      setTimeout(() => {
                        Cookies.set("loggedIn", true);
                        this.props.history.push("/dashboard");
                      }, 5000);
                    }
                  }}
                  validationSchema={validationLogin}
                >
                  {({ errors, touched }) => (
                    <Form className="w-100 p-0">
                      {this.renderBanner()}

                      <Group className="field-group mb-3" controlId="fname">
                        <Label className="common-text">Name<sup className="compulsory">*</sup></Label>
                        <InputFormik
                          type="text"
                          placeholder="Enter name"
                          className={`custom-input ${touched.name && errors.name ? "error-border" : ""}`}
                          id="name"
                          name="name"
                        />
                        {!errors.name ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"name"} />
                          </div>
                        )}
                      </Group>

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
                            placeholder="Enter password"
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
                      <Group className="field-group mb-3" controlId="psw">
                        <Label className="common-text">Confirm Password<sup className="compulsory">*</sup></Label>
                        <div className="position-relative">
                          <InputFormik
                            type="password"
                            placeholder="Enter password"
                            className={`custom-input ${touched.password_confirmation && errors.password_confirmation ? "error-border" : ""}`}
                            id="password_confirmation"
                            name="password_confirmation"
                          />
                          <a
                            href="/"
                            className="hide-show-pass"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                document.getElementById("password_confirmation").type === "text"
                              ) {
                                document.getElementById("password_confirmation").type =
                                  "password";
                              } else {
                                document.getElementById("password_confirmation").type = "text";
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
                        {!errors.password_confirmation ? (
                          <div className="success"></div>
                        ) : (
                          <div className="custom-error">
                            <ErrorMessage name={"password_confirmation"} />
                          </div>
                        )}
                      </Group>
                      <Group className="field-group" controlId="login">
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="d-flex align-items-center">
                            <FormikCheckBox type="checkbox" name="terms" value={this.state.isChecked} />
                            <h4
                              className={`common-text c-pointer check-text mx-2 mb-0 ${touched.terms && errors.terms && "custom-error"}`}
                            >
                              I agree to the<span className="mx-1 bottom-line">terms and conditions</span>
                            </h4>
                          </div>
                        </div>
                      </Group>
                      {this.state.loader ? <Loader /> : null}
                      <Group className="mt-4" controlId="login">
                        <div className="d-grid gap-2">
                          <CustomButton
                            name="Create account"
                            size="lg"
                            type="submit"
                            className="custom-button w-100 d-flex align-items-center justify-content-center"
                          />
                        </div>
                      </Group>
                    </Form>
                  )}
                </Formik>
              </Row>
            </Container>
          </div>
        </div>
      </div >
    );
  }
}

export default withRouter(CreateAccount)
