import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class IntegrationDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="integration-document">
                <h4>How to integrate showroom in your website</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <code>
                <pre>curl https://api.stripe.com/v1/charges/ch_3Ltnp52eZvKYlo2C1WWxoF9j \</pre>
                <pre>-u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \</pre>
                <pre>-H "Stripe-Account: acct_1032D82eZvKYlo2C" \</pre>
                <pre>-G</pre>
                </code>
            </div>
        )
    }
}
export default withRouter(IntegrationDocument);