import React from "react";
import { Form } from "react-bootstrap";
import { Field } from "formik";

export const InputField = (props) => {
    return (
        <Form.Control {...props} />
    )
}

export const TextArea = (props) => {
    return (
        <textarea {...props}>{props.textareaValue}</textarea>
    )
}

export const Group = (props) => {
    return (
        <Form.Group className={props.className}>
            {props.children}
        </Form.Group>
    );
};

export const Label = (props) => {
    return (
        <Form.Label {...props}>
            {props.children}
        </Form.Label>
    );
}

export const InputFormik = (props) => {
    return (
        <Field {...props} className={`form-control ${props.className}`} />
    )
}

export const CheckBox = (props) => {
    return (
        <label className="checkbox-wrapper">
            <InputField {...props} />
            <span className="checkbox-check"></span>
        </label>
    )
}
export const FormikCheckBox = (props) => {
    return (
        <label className="checkbox-wrapper">
            <Field {...props} />
            <span className="checkbox-check"></span>
        </label>
    )
}

export const FormikControl = (props)=>{
    return (
        <Field {...props} className={`${props.className}`} >
        {props.children}    
        </Field>
    )
}