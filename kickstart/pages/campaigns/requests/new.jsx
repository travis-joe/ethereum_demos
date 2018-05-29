import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  onSubmit = async e => {
    e.preventDefault();
    const { value, description, recipient } = this.state;
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await Campaign(this.props.address)
        .methods.createRequest(
          description,
          web3.utils.toWei(value, "ether"),
          recipient
        )
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
