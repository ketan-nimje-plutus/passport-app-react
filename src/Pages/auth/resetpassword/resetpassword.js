import { Formik, Form, ErrorMessage } from "formik";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CustomButton } from "../../../component/button";
import { Group, InputFormik, Label } from "../../../component/formcomponent";
import * as Yup from "yup";
import { changeLogging } from "../login/login.act";
// import { loginToAccount } from "../login/login.ctrl";
import { withRouter } from "react-router-dom";
// import AuthPlaceholder from "../../../assets/images/auth-placeholder.png";
import { forgotPassword } from "../login/login.ctrl";
// import { AuthHeader } from "../../../component/header/header"; 
import { AlertNotification } from "../../../component/uicomponent";
import { Loader } from "../../../component/loader";

const initialVals = {
  email: "",
};
const validationResetPassword = Yup.object({
  email: Yup.string().email("Email address is not valid.").required("Email address is required."),
});
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      errormsg: '',
      banner: null,
      loader: false
    };
    // console.log(this.props.auth.loggedIn);
  }
  componentWillMount() {
    const token = localStorage.getItem("showroomAccess");
    (token == null || undefined) &&
      this.setState({ loggedIn: false, errormsg: false });
  }
  renderBanner() {
    let { banner, errormsg } = this.state;
    if (banner === null) return false;
    if (banner.status === true)
      return <AlertNotification variant="success" errormessage={errormsg} />;
    if (banner.status === false)
      return <AlertNotification variant="danger" errormessage={errormsg} />;
  }
  render() {
    // let { errormsg } = this.state;
    return (
      <div className="showroom-auth">
        <div className="d-flex">
          <div className="auth-placeholder">
            {/* <img src={AuthPlaceholder} alt="Auth-placeholder" /> */}
          </div>
          <div className="auth-detail no-hero-image">
            <Container className="auth-wrapper p-0 d-flex align-items-center justify-content-center">
              <Row className="w-100">
                <h4 className="auth-page-title p-0">Reset your password</h4>
                {this.renderBanner()}
                <Formik
                  initialValues={initialVals}
                  onSubmit={async (fields, actions) => {
                    this.setState({ loader: true })
                    let { success, data } = await forgotPassword(
                      fields.email.trim()
                    );
                    console.log(data);
                    if (success) {
                      this.setState({
                        ...this.state,
                        banner: { 'status': true },
                        errormsg: data.message,
                        loader: false
                      });
                      setTimeout(() => {
                        this.props.history.push("/", { message: 'If you have an account, we’ll send you a reset link.' });
                      }, 2000);
                    } else {
                      this.setState({
                        ...this.state,
                        banner: { 'status': false },
                        errormsg: data.detail,
                        loader: false
                      });
                    }
                  }}
                  validationSchema={validationResetPassword}
                >
                  {({ errors, touched }) => (
                    <Form className="w-100 p-0">
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
                      {this.state.loader ? <Loader /> : null}
                      <Group className="field-group mt-4" controlId="login">
                        <CustomButton name="Send reset instructions" className="custom-button w-100 d-flex align-items-center justify-content-center" type="submit" />
                      </Group>
                      <div className="text-center">
                        <span className="goback border-bottom d-inline-block text-center common-text c-pointer" onClick={() => this.props.history.push("/")}>Go back</span>
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));
