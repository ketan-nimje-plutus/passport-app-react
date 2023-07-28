import React, { Component } from "react";
import { PageTitle } from "../../component/pagetitle/pagetitle";
import CustomerTable from "./table";
import { withRouter } from 'react-router-dom';
import { getCustomers, deleteCustomer, bulkCustomerDelete } from "./customer.ctrl";
import { connect } from 'react-redux';
import { PaginationComp } from "../../utils/pagination";
import { AlertNotification } from "../../component/uicomponent";
import { FullWidthLoader } from '../../component/loader';

class User extends Component {
    constructor(props) {
        super();
        this.state = {
            page: 1,
            pageSize: 10,
            search: '',
            msg: null,
            banner: null,
            FullWidthLoader: false
        }
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.setPage = this.setPage.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.bulkDeleteHandler = this.bulkDeleteHandler.bind(this);
    }
    renderBanner() {
        let { banner, msg } = this.state;
        if (banner === null) return false;
        if (banner.status === true)
            return <AlertNotification variant="success" errormessage={msg} />;
        if (banner.status === false)
            return <AlertNotification variant="danger" errormessage={msg} />;
    }
    editHandler(customer) {
        console.log(customer);
        this.props.history.push("/edit-users/" + customer.id);
    }

    deleteHandler = async (customerID) => {
        console.log("customer", customerID)
        this.setState({ FullWidthLoader: false });
        let { success, data } = await deleteCustomer(customerID);
        if (success) {
            this.setState({ banner: { 'status': true }, msg: data.message, FullWidthLoader: false });
            this.props.getCustomers(this.state.page, this.state.pageSize, this.state.search);
        } else {
            this.setState({ banner: { 'status': false }, msg: data.detail ?? data.message, FullWidthLoader: false });
        }
        setTimeout(() => {
            this.setState({
                ...this.state,
                banner: false,
                msg: null
            });
        }, 3000);
    }

    bulkDeleteHandler = async (ids) => {
        this.setState({ FullWidthLoader: false });
        let { success, data } = await bulkCustomerDelete({
            "customer_ids": ids
        });
        if (success) {
            this.setState({ banner: { 'status': true }, msg: data.message, FullWidthLoader: false });
            this.props.getCustomers(this.state.page, this.state.pageSize, this.state.search);
        } else {
            this.setState({ banner: { 'status': false }, msg: data.detail, FullWidthLoader: false });
        }
        setTimeout(() => {
            this.setState({
                ...this.state,
                banner: false,
                msg: null,
            });
        }, 3000);
    }
    updateSearchValue = (event) => {
        this.setState({
            page: 1,
            search: event.target.value
        }, () => {
            //callback  
            this.setPage(1);
        });
    }

    setPageSize = (pageSizevalue) => {
        this.setState({ pageSize: pageSizevalue }, () => {
            //callback
            this.props.getCustomers(1, this.state.pageSize, this.state.search);
        });
    }

    setPage = (pageValue) => {
        this.setState({ page: pageValue }, () => {
            //callback
            this.props.getCustomers(this.state.page, this.state.pageSize, this.state.search);
        });
    }
    componentDidMount() {
        this.setState({ FullWidthLoader: false });

        this.props.getCustomers(this.state.page, this.state.pageSize, this.state.search);
    }
    render() {
        const { customers, loading, counts, error } = this.props;
        return (
            <div className="customers">
                {this.state.FullWidthLoader || loading ? <FullWidthLoader /> : null}
                {error && error !== '' ? <AlertNotification variant="danger" errormessage={error} /> : null}
                {
                    customers && customers.length >= 0 ?
                        <>
                            {this.renderBanner()}
                            <PageTitle title="Users" className="custom-button" add_button="true" onClick={() => this.props.history.push("/add-user")} buttonname="Add new" />
                            <CustomerTable
                                loader={loading} customers={customers} checkBox={[]}
                                onEdit={this.editHandler.bind(this)}
                                onDelete={this.deleteHandler.bind(this)}
                                onBulkDelete={this.bulkDeleteHandler.bind(this)}
                                onChange={this.updateSearchValue.bind(this)}
                            />
                            <PaginationComp records={counts} page={this.state.page} pageSize={this.state.pageSize} onChange={this.setPage} onPageSizeChange={this.setPageSize} />
                        </>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers.customers,
        loading: state.customers.loading,
        error: state.customers.error,
        counts: state.customers.counts
    };
};
const mapDispatchToProps = (dispatch) => {
    return { getCustomers: (page, pageSize, search) => dispatch(getCustomers(page, pageSize, search)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User)); 