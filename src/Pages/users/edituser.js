import React, { Component } from "react";
import { InnerPageTitle } from "../../component/pagetitle/innerpagetitle";
import { Container, Row, Col } from "react-bootstrap";
import { GrayBorderBox, AlertNotification } from "../../component/uicomponent";
import { Group, InputFormik, Label, } from "../../component/formcomponent";
import { withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../../component/button";
import { saveUserData, getItemData } from "./user.ctrl";
import { FullWidthLoader } from "../../component/loader";



const validationForm = Yup.object({
    name: Yup.string().required("Name is required.").min(3, 'Name must be at least 3 characters.').max(20, 'Name must be at most 20 characters.').matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
    email: Yup.string().email("Email address is not valid.").required("Email address is required."),
});
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: [],
            req_param: [],
            msg: '',
            banner: null,
            action: 'Edit',
            loader: true,
        };
    }

    componentDidMount = () => {
        this.setState({ FullWidthLoader: true });
        this.getData();
    }

    getData = async () => {
        if (this.state.id !== null) {
            let res = await getItemData("get-user-details/" + this.state.id);
            if (res.status) {
                this.setState({
                    FullWidthLoader: false,
                    data: res.data
                });
            }
        }
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

    render() {

        return (
            <>
                <div className="items-action">
                    {this.state.FullWidthLoader ? <FullWidthLoader /> : null}

                    <Container>
                        {this.renderBanner()}
                        <InnerPageTitle pagetitle="Edit user"
                            onClick={() => this.discardData()}
                        />
                        {this.state.data && this.state.data.id &&
                            <Formik
                                initialValues={{
                                    name: this.state.data.name,
                                    email: this.state.data.email,
                                    id: this.state.data.id
                                }}

                                onSubmit={async (fields, actions) => {
                                    console.log("fields", fields);
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
                        }

                    </Container>
                </div >
            </>
        );
    }
}
export default withRouter(EditUser);