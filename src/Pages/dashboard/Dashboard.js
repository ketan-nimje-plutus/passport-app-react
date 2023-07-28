import React, { Component } from "react";
import { PageTitle } from "../../component/pagetitle/pagetitle";
import { AlertNotification } from "../../component/uicomponent";
import { FullWidthLoader } from '../../component/loader';

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            banner: null,
            FullWidthLoader: false,
        }
    }

    componentDidMount = async () => {
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    renderBanner() {
        let { banner, msg } = this.state;
        if (banner === null) return false;
        if (banner.status === true)
            return <AlertNotification variant="success" errormessage={msg} />;
        if (banner.status === false)
            return <AlertNotification variant="danger" errormessage={msg} />;
    }

    render() {
        return (
            <div className="Dashboard">
                {this.state.FullWidthLoader ? <FullWidthLoader /> : null}
                {this.renderBanner()}
                <PageTitle add_button={false} title="Dashboard" />
            </div>
        )
    }
}

export default Dashboard



