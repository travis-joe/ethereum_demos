import React, {Component} from "react";
import Layout from "../../components/Layout";
import {Form, Button, Input, Message} from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import {Link, Router} from '../../routes'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;
    const summary = await Campaign(address).methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    )
  }
}

export default CampaignShow;