const axios = require("axios");

module.exports = {
  name: "Create Subscription",
  description: "Subscribes a user to a campaign given their email address",
  key: "perkexchange-subscribe-action",
  version: "0.0.14",
  type: "action",
  props: {
    email: {
      type: "string",
      label: "Email",
      description: "User's email address",
    },
    amount: {
      type: "integer",
      label: "Amount",
      optional: true,
      description: "Number of tokens to reward user. Default is 0",
    },
    campaignSecret: {
      type: "string",
      label: "Campaign secret",
      secret: true,
    },
    domain: {
      type: "string",
      label: "Target domain",
      default: "https://perk.exchange",
    },
  },
  async run() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.campaignSecret}`,
    };

    try {
      await axios.post(
        `${this.domain}/api/rewards`,
        {
          email: this.email,
          amount: this.amount || 0,
        },
        {
          headers: headers,
        }
      );
      return {
        success: true,
      };
    } catch (e) {
      throw Error(e.message);
    }
  },
};
