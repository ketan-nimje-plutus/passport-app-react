import React from "react";
import BackIcon from "../../assets/images/icon_back.svg";
import { Badge } from "react-bootstrap";
import {CustomButton} from "../button"

export const InnerPageTitle = (props) => {
    
    return (
        <div className="inner-page-title d-flex align-items-center c-pointer" >
            <img src={BackIcon} alt="Icon" onClick={props.onClick}/>
            <h4 className="page-heading d-flex align-items-center">
                {props.pagetitle}
                {props.status ?
                    <Badge {...props} bg={props.statusname === "Paid" ? "success" : (props.statusname === "Void" ? "danger" : (props.statusname === "Overlay images" ? "info" :"warning"))}>{props.statusname}</Badge>
                    : ''}
            </h4>
            {props.inner_button && <CustomButton {...props} className="custom-button d-flex" name={props.innerbuttonname} onClick={props.onSubmit} />}
        </div>
    )
}  