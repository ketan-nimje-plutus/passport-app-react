import React from "react";
import { Button } from "react-bootstrap"; 

export const CustomButton = (props) => {
    return (
        <Button {...props}>
            {props.name} 
        </Button>
    )
}

export const AttributeButton = (props) => {
    return (
        <Button {...props}>
            {props.attributeName}
        </Button>
    )
}

export const PlanButton = (props) => {
    return (
        <Button
            type="submit" {...props}>
            {props.buttonname}
        </Button>
    )
}

export const BorderButton = (props) => {
    return (
        <Button {...props} className="border-button">
            {props.borderbutton}
        </Button>
    )
}

