import React from "react";
import { CustomButton } from "../button";

export const PageTitle = (props) => {
    return (
        <div className="page-title d-flex align-items-center justify-content-between">
            <h4 className="page-heading">{props.title}</h4>
            {props.add_button && <CustomButton {...props} name={props.buttonname} />}
        </div>
    )
}