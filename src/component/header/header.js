import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
// import Cookies from "js-cookie";
import BackIcon from "../../assets/images/icon_back.svg";
import { CustomButton } from "../button";
import CloseItem from "../../assets/images/icon_close.svg";
import { useHistory } from "react-router-dom";
import { Loader } from "../loader";
import IconMenuToggle from "../../assets/images/icon_menu_toggle.svg";
import PlaceholderIcon from "../../assets/images/placeholder.svg";
import IconUploadImages from "../../assets/images/Icon_Upload_image.svg";

import { getStoreUserData, clearLocalData } from "../../utils/getLocalData";
class StoreHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': getStoreUserData('name'),
            loader: false
        }
    }
    logout = async () => {
        this.setState({ loader: true })
        await clearLocalData();
        window.location.href = "/";
    }
    render() {
        return (
            <>
                {this.state.loader ? <Loader /> : null}
                <header className="showroom-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="toggle-button web-hide c-pointer">
                            <img src={IconMenuToggle} alt="Toggle Icon" onClick={() => this.props.onClick()} />
                        </div>
                        <Dropdown className="ms-auto">
                            <Dropdown.Toggle id="profile">
                                <div className="d-flex align-items-center">
                                    <span className="d-flex align-items-center justify-content-center">{this.state.name[0]}</span>
                                    <h5 className="common-text">{this.state.name} </h5>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="" onClick={this.logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </header>
            </>
        )
    }
}
export default withRouter(StoreHeader)

export const AuthHeader = (props) => {
    return (
        <div className="d-flex align-items-center justify-content-end" {...props}>
            <h4 className="authheader-title">{props.headercontent}<span className="c-pointer">{props.headeraction}</span></h4>
        </div>
    )
}

export const SettingHeader = (props) => {
    return (
        <div className="setting-header d-flex">
            <h4 className="authheader-title c-pointer d-flex align-items-center" {...props}><img src={BackIcon} alt="Back button" /><span className="mx-3">Settings</span></h4>
            <div className="toggle-button web-hide c-pointer ms-auto" onClick={() => props.onClick('toggle')}>
                <img src={props.image} alt="Toggle Icon" />
            </div>
        </div>
    )
}

export const SaveChangesHeader = (props) => {
    return (
        <div className="save-changes d-flex align-items-center justify-content-between flex-wrap">
            <h4 className="text-white">Unsaved changes</h4>
            <div className="d-flex save-btn-group">
                <CustomButton name="Discard" onClick={props.discardData} className="custom-button discard-btn me-3" />
                <CustomButton name="Save" onClick={props.saveData} className="custom-button " />
            </div>
        </div>
    )
}


// Item configurator component
export const ItemConfiguratorHeader = (props) => {
    const history = useHistory();
    return (
        <div className="blank-item-header">
            <div className="d-flex align-items-center justify-content-between header-alignment flex-wrap">
                <div className="configure-title-detail">
                    <h4>{props.itemheadertitle}</h4>
                    {props.permutation ? (
                        <span className="permutation-value">
                            {props.permutationvalue} permutations
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className="d-flex align-items-center close-preview">
                    {props.previewsetlink ? (
                        <>
                            <span onClick={() => { props.previewlinkDisabled === false && props.onClick() }} className={`bottom-line ${props.previewlinkDisabled ? `disabled-text` : `c-pointer`}`}>{props.previewlink}</span>
                            {props.overlay ?
                                <div className="stone-count text-end">
                                    <h4 className="m-0">Stone count</h4>
                                    <p className="m-0">{props.stoneCount}</p>
                                </div>
                                : null
                            }
                        </>
                    ) : (
                        ""
                    )}
                    {props.btnupload ? (
                        <>
                            {props.overlay ?
                                <button onClick={() => history.push("/image-overlap/" + props.productID)} type="button" className={`custom-button custom-outline btn`}>
                                    <img src={PlaceholderIcon} className="upload-images" alt="placeholder" />
                                    Create Masks
                                </button>
                                : null
                            }
                            <button onClick={() => { props.previewlinkDisabled === false && props.onClick() }} type="button" className={`custom-button custom-outline btn ${props.previewlinkDisabled ? `disabled-text` : `c-pointer`}`}>
                                <img src={IconUploadImages} className="upload-images" alt="placeholder" />
                                {props.previewlink}
                            </button>
                        </>
                    ) : (
                        ""
                    )}
                    <img
                        src={CloseItem}
                        alt="Close Icon"
                        className="c-pointer"
                        onClick={() => props.discardData ? props.discardData() : history.push(props.returnUrl)}
                    />
                </div>
            </div>
        </div>
    );
};