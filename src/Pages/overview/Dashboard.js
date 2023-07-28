import React, { Component } from "react";
import { PageTitle } from "../../component/pagetitle/pagetitle";
import { CustomDropdown, AlertNotification } from "../../component/uicomponent";
import { Row, Col } from "react-bootstrap"; 
import { Loader, FullWidthLoader } from '../../component/loader';
// import { Chart } from "react-google-charts";

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            compared_to: 'Jan 6-12, 2022',
            extra_sales_data: { 'sales': "0", 'profit': "0" },
            extra_order_data: { 'sales': "0", 'profit': "0" },
            extra_abandonded_data: { 'sales': "0", 'profit': "0" },
            total_sales: [],
            total_orders: [],
            total_abandonded: [],
            msg: '',
            banner: null,
            FullWidthLoader: false,
            filter: 'Last 7 days'
        }
    }

    componentDidMount = async () => {
        this.callChartData('Last 7 days');
    }

    callChartData = async (e) => {
        // this.setState({FullWidthLoader :true});
        // console.log("callChartData >", e);
        // let res = await getChartData('sales/dashboard/'+e.replace(/ /g,"_").toLowerCase());
        // if(res.status && res.code === 200) {
        //     if(res.data.total_sales !== undefined  ) {
        //     this.setState({
        //         total_sales : res.data.total_sales,
        //         total_orders : res.data.total_orders,
        //         total_abandonded : res.data.total_abandonded,
        //         compared_to : res.data.compared_to,
        //         extra_sales_data: res.data.extra_sales_data,
        //         extra_order_data: res.data.extra_order_data,
        //         extra_abandonded_data: res.data.extra_abandonded_data,
        //         loader : false,
        //         FullWidthLoader : false,
        //         filter : e    
        //     })
        //     }else{
        //         this.setState({FullWidthLoader : false,
        //             filter : e });        
        //     }
        // }else{
        // this.setState({
        //     banner: { 'status': false },
        //     msg: res.data.detail,
        //     loader: false,
        //     FullWidthLoader : false,
        //     filter : e
        // });    
        // }
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



