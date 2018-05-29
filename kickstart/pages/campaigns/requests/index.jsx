import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { Link, Router } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill(0)
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    console.log(requests);
    return { address, requests, requestCount };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
