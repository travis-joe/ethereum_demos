import React, {Component} from "react";
import Layout from "../../components/Layout";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Link, Router} from '../../routes'

class CampaignShow extends Component {
  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    )
  }
}

export default CampaignShow;