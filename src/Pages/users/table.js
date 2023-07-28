import React, { Component } from "react";
import { InputField } from "../../component/formcomponent";
import SearchIcon from "../../assets/images/icon_search_gray.svg";
import { Table, Dropdown } from "react-bootstrap";
import MoreIcon from "../../assets/images/icon_more.svg";
import { CheckBox } from "../../component/formcomponent";
import { withRouter } from "react-router-dom";
import { Loader } from '../../component/loader';
import { ShowroomModal } from "../../component/uicomponent";
import { debounceWait } from "../../utils/basic";
class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBox: this.props.checkBox,
            openmodal: false,
            deleteALLCustomers: false,
            customerID: null
        }
    }
    onTdClick = (customer) => {

        this.props.onEdit(customer);
    }
    onTdDelete = (customerID) => {
        this.setState({ openmodal: false });
        this.props.onDelete(customerID);
    }
    selectAll = (e) => {

        if (e.target.checked) {
            this.props.customers.forEach(x => {
                if (this.state.checkBox.includes(x.id) === false) {
                    this.state.checkBox.push(x.id);
                }
            });
            this.setState({})
        } else {
            this.setState({ "checkBox": [] })
        }
    }
    onChkClick = (event) => {
        let newVal = event.target.value
        let stateVal = this.state.checkBox
        stateVal.indexOf(parseInt(newVal)) === -1
            ? stateVal.push(parseInt(newVal))
            : stateVal.length === 0
                ? (stateVal = [])
                : stateVal.splice(stateVal.indexOf(parseInt(newVal)), 1)

        this.setState({ checkBox: stateVal })
    }
    deleteCustomers = () => {
        this.setState({ deleteALLCustomers: false, "checkBox": [], })
        this.props.onBulkDelete(this.state.checkBox);
    }

    toggleModal = (customerID) => {
        this.setState({ openmodal: !this.state.openmodal, customerID: customerID });
    }
    toggleDeleteModal = () => {
        this.setState({ deleteALLCustomers: !this.state.deleteALLCustomers });
    }
    setSearchAction = debounceWait((e) => this.searchCategory(e));

    searchCategory = async (e) => {
        this.props.onChange(e)
    }
    render() {
        const { loader, customers } = this.props;
        return (
            <div className="customers-table">
                <div className="table-wrapper">
                    <div className="search-data">
                        <div className="position-relative">
                            <img src={SearchIcon} alt="Icon" />
                            <InputField placeholder="Search customers" className="custom-input" name="search" id="search" onChange={(e) => this.setSearchAction(e)} />
                        </div>
                    </div>
                    {
                        loader ? <Loader /> :
                            <Table cellPadding={0} cellSpacing={0} striped hover className="mb-0" responsive>
                                <thead>
                                    {
                                        this.state.checkBox.length > 0 ?
                                            <tr className="fix-header position-relative">
                                                <th style={{ width: '60px' }} className="text-center sticky-column">
                                                    <CheckBox type="checkbox" onChange={(e) => this.selectAll(e)} />
                                                </th>
                                                <th >
                                                    <div className="bulk-edit">
                                                        <span className="bulk-edit-title common-text">{this.state.checkBox.length} selected</span>
                                                        <button type="button" className="custom-button custom-outline ms-4 me-2" onClick={() => this.toggleDeleteModal()}>Delete</button>
                                                    </div>
                                                </th>
                                                <th style={{ width: '32%' }}></th>
                                                <th style={{ width: '32%' }} className="text-center"></th>
                                                <th style={{ width: '60px' }}></th>
                                            </tr>
                                            :
                                            <tr>
                                                <th style={{ width: '60px' }} className="text-center">
                                                    <CheckBox type="checkbox" onChange={(e) => this.selectAll(e)} />
                                                </th>
                                                <th style={{ width: '32%' }}>Name</th>
                                                <th style={{ width: '32%' }}>Email</th>
                                                <th style={{ width: '60px' }}>Actions</th>
                                            </tr>
                                    }
                                </thead>
                                <tbody>
                                    {
                                        customers && customers.length > 0 ?
                                            customers.map((customerData, idx) => (
                                                <TableData
                                                    key={idx}
                                                    id={customerData.id}
                                                    name={customerData.name}
                                                    email={customerData.email}
                                                    checked={(this.state.checkBox.indexOf(customerData.id) !== -1) ? true : null}
                                                    onClick={() => this.onTdClick(customerData)}
                                                    onChange={(e) => this.onChkClick(e)}
                                                    onDelete={() => this.toggleModal(customerData.id)}
                                                />
                                            ))
                                            :
                                            <tr><td key={0} colSpan={6} align={"center"}>No records to show here</td></tr>
                                    }
                                </tbody>
                            </Table>
                    }
                </div>
                <ShowroomModal
                    className="sr-modal"
                    show={this.state.openmodal}
                    onHide={this.toggleModal.bind(this, this.state.openmodal)}
                    onSave={this.onTdDelete.bind(this, this.state.customerID)}
                    modalheading="Delete Customer?"
                    removebutton="Delete"
                    cancelbutton="Cancel"
                >
                    <p className="common-text m-0 mb-2">
                        Are you sure you want to delete this user?
                    </p>
                </ShowroomModal>
                <ShowroomModal
                    className="sr-modal"
                    show={this.state.deleteALLCustomers}
                    onHide={this.toggleDeleteModal.bind(this, this.state.deleteALLCustomers)}
                    onSave={this.deleteCustomers.bind(this)}
                    modalheading={this.state.checkBox.length > 1 ? "Delete Users?" : "Delete user?"}
                    removebutton="Delete"
                    cancelbutton="Cancel"
                >
                    {
                        this.state.checkBox.length > 1 ?
                            <p className="common-text m-0 mb-2">
                                Are you sure you want to delete your users?
                            </p> :
                            <p className="common-text m-0 mb-2">
                                Are you sure you want to delete this user?
                            </p>
                    }
                </ShowroomModal>
            </div>
        )
    }
}
export default withRouter(CustomerTable)

export function TableData({
    id,
    name,
    email,
    checked,
    onClick,
    onChange,
    onDelete,
}) {
    return (
        <tr>
            <td className="text-center">
                <CheckBox type="checkbox" className="chkbox" value={id} onChange={onChange} data-id={id} checked={checked} />
            </td>
            <td onClick={onClick}>
                <div className="order-number">
                    {name}
                </div>
            </td>
            <td onClick={onClick}>
                <div className="order-number">
                    {email}
                </div>
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        <img src={MoreIcon} className="mx-3 d-block" alt="More Icon" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={onClick}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}