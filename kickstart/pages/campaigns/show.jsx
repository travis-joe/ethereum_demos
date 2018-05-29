import React, {Component} from "react";
import Layout from "../../components/Layout";
import {Card, Form, Button, Input, Message} from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import {Link, Router} from '../../routes'
import web3 from '../../ethereum/web3'
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

  renderCards() {
    const {minimumContribution, balance, requestsCount, approversCount, manager} = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'who create campaign',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'minimum contribution(wei)',
        description: 'you must contribute at least this much wei',
      },
      {
        header: requestsCount,
        meta: 'number of requests',
        description: 'a request tries to withdraw money',
      },
      {
        header: approversCount,
        meta: 'number of approvers',
        description: 'people who a;ready donated to this',
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: 'Campaign balance',
        description: 'how much money left to spend',
      },
    ];

    return <Card.Group items={items}/>
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow;