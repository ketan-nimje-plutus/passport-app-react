import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CloseSidebar from "../../assets/images/icon_CloseModal.svg";
import { withRouter } from "react-router-dom"

export class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        
        return (
            <div className={`showroom-sidebar d-flex flex-wrap${(this.props.sideBar) ? ` sidebar-open` : ``}`}>
                <div className="store-menu w-100">
                    <span className="close-sidebar d-flex align-items-center justify-content-center me-3 ms-auto c-pointer mb-3" onClick={() => this.props.onClick()} >
                        <img src={CloseSidebar} alt="Close-sidebar" width={16} />
                    </span>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Link onClick={() => this.props.onClick()} to="/dashboard" className={`nav-link ${this.props.location.pathname === '/dashboard' ? `active` : ''}`}>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.1C7.7 16.1 6.6 15 6.6 13.7V2.4C6.6 1.1 7.7 0 9 0C10.3 0 11.4 1.1 11.4 2.4V13.7C11.4 15 10.3 16.1 9 16.1ZM9 1.5C8.5 1.5 8.1 1.9 8.1 2.4V13.7C8.1 14.2 8.5 14.6 9 14.6C9.5 14.6 9.9 14.2 9.9 13.7V2.4C9.9 1.9 9.5 1.5 9 1.5ZM15.6 16.1C14.3 16.1 13.2 15 13.2 13.7V7C13.2 5.7 14.3 4.6 15.6 4.6C16.9 4.6 18 5.7 18 7V13.7C18 15 16.9 16.1 15.6 16.1ZM15.6 6.1C15.1 6.1 14.7 6.5 14.7 7V13.7C14.7 14.2 15.1 14.6 15.6 14.6C16.1 14.6 16.5 14.2 16.5 13.7V7C16.5 6.5 16.1 6.1 15.6 6.1ZM2.4 16.1C1.1 16.1 0 15 0 13.7V9.6C0 8.3 1.1 7.2 2.4 7.2C3.7 7.2 4.8 8.3 4.8 9.6V13.7C4.8 15 3.7 16.1 2.4 16.1ZM2.4 8.7C1.9 8.7 1.5 9.1 1.5 9.6V13.7C1.5 14.2 1.9 14.6 2.4 14.6C2.9 14.6 3.3 14.2 3.3 13.7V9.6C3.3 9.1 2.9 8.7 2.4 8.7Z" fill="#8192B9" />
                            </svg>
                            <span>Dashboard</span></Link>
                        <Link onClick={() => this.props.onClick()} to="/users" className={`nav-link ${(this.props.location.pathname.indexOf('users') > -1) ? `active` : ''}`}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 10C20 4.5 15.5 0 10 0C4.5 0 0 4.5 0 10C0 13.1 1.4 15.8 3.6 17.7C5.4 19.1 7.6 20 10 20C12.4 20 14.6 19.1 16.4 17.7C18.6 15.8 20 13.1 20 10ZM1.5 10C1.5 5.3 5.3 1.5 10 1.5C14.7 1.5 18.5 5.3 18.5 10C18.5 12.4 17.5 14.6 15.9 16.1C14.3 14.6 12.2 13.8 10 13.8C7.8 13.8 5.7 14.6 4.1 16.1C2.5 14.6 1.5 12.4 1.5 10ZM5.3 17.1C6.6 16 8.3 15.4 10 15.4C11.7 15.4 13.4 16 14.7 17.1C13.4 18 11.7 18.5 10 18.5C8.3 18.5 6.7 18 5.3 17.1ZM10 11.9C12 11.9 13.6 10.3 13.6 8.3C13.6 6.3 12 4.6 10 4.6C8 4.6 6.4 6.3 6.4 8.3C6.4 10.3 8 11.9 10 11.9ZM10 6.1C11.2 6.1 12.1 7.1 12.1 8.2C12.1 9.3 11.1 10.3 10 10.3C8.9 10.3 7.9 9.3 7.9 8.2C7.9 7.1 8.8 6.1 10 6.1Z" fill="#8192B9" />
                            </svg>
                            <span>Users</span></Link>
                    </Nav>
                </div>

            </div>
        )
    }
}

export default withRouter(Sidebar)