import React, { Component } from "react";
import { InnerPageTitle } from "../../component/pagetitle/innerpagetitle";
import { Container, Row, Col } from "react-bootstrap";
import { GrayBorderBox, AlertNotification } from "../../component/uicomponent";
import { FormikControl, Group, InputFormik, Label, } from "../../component/formcomponent";
import IconDropDown from "../../assets/images/icon_dropdown.svg";
import { withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../../component/button";
import { saveUserData } from "./user.ctrl";
import { isPrice } from "../../utils/basic";

import ViewDisabled from "../../assets/images/ViewDisabled@2x.svg";
import hideDisabled from "../../assets/images/eye-View@2x.svg";

const initialVals = {
  email: "",
  password: "",
  name: "",
  terms: false
};

const validationForm = Yup.object({
  name: Yup.string().required("Name is required.").min(3, 'Name must be at least 3 characters.').max(20, 'Name must be at most 20 characters.').matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
  email: Yup.string().email("Email address is not valid.").required("Email address is required."),
  password: Yup.string().min(8, "8 characters must be required.").required("Password is required."),
});
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PricingListData: [],
      req_param: [],
      msg: '',
      banner: null,
    };
  }

  async saveData() {
    console.log("save data >");
    document.getElementById('itemAddFormSave').click();
  }

  onDrop(data) {
    console.log(data);
    // => banana
  }
  renderBanner() {
    let { banner, msg } = this.state;
    if (banner === null) return false;
    if (banner.status === true)
      return <AlertNotification variant="success" errormessage={msg} />;
    if (banner.status === false)
      return <AlertNotification variant="danger" errormessage={msg} />;
  }

  discardData = () => {
    this.props.history.push("/users")
  }

  componentDidMount = async () => {
  }

  render() {
    const initialValues = {
      name: '',
      description: '',
      price: '',
      status: 'Draft',
    }

    return (
      <>
        <div className="items-action">
          <Container>
            {this.renderBanner()}
            <InnerPageTitle pagetitle="Add user"
              onClick={() => this.discardData()}
            />
            <Formik
              initialValues={initialVals}
              onSubmit={async (fields, actions) => {
                this.setState({ loader: true });
                let { status, data, message } = await saveUserData('save-user', fields);
                if (!status) {
                  this.setState({
                    ...this.state,
                    banner: { 'status': false },
                    errormsg: message,
                    loader: false
                  });
                }
                if (data) {
                  this.setState({
                    ...this.state,
                    banner: { 'status': true },
                    msg: message,
                    loader: false
                  });
                  setTimeout(() => {
                    this.props.history.push("/users");
                  }, 5000);
                }
              }}
              validationSchema={validationForm}
            >
              {({ errors, touched, setFieldValue, submitForm, resetForm }) => (
                <Form className="w-100 p-0">
                  <Row className="mt-4">
                    <Col lg={6}>
                      <GrayBorderBox boxtitle="" linkname="">
                        <Group className="field-group mb-3" controlId="fname">
                          <Label className="common-text">Name<sup className="compulsory">*</sup></Label>
                          <InputFormik
                            type="text"
                            placeholder="Enter name"
                            className={`custom-input ${touched.name && errors.name ? "error-border" : ""}`}
                            id="name"
                            name="name"
                            onChange={(e) => setFieldValue("name", e.target.value)}

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
                            onChange={(e) => setFieldValue("email", e.target.value)}

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
                              onChange={(e) => setFieldValue("password", e.target.value)}

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


                        <Group className="mt-4" controlId="login">
                          <div className="d-grid gap-2">
                            <CustomButton
                              name="Save"
                              size="lg"
                              type="submit"
                              className="custom-button w-100 d-flex align-items-center justify-content-center"
                            />
                          </div>
                        </Group>
                      </GrayBorderBox>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>

          </Container>
        </div >
      </>
    );
  }
}
export default withRouter(AddUser);