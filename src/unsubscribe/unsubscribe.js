const axios = require("axios");

module.exports = {
  name: "Unsubscribe a user",
  description: "Unsubscribes a user from a campaign",
  key: "perkexchange-unsubscribe-action",
  version: "0.0.6",
  type: "action",
  props: {
    email: {
      type: "string",
      label: "Email",
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
      await axios.delete(`${this.domain}/api/rewards`, {
        headers: headers,
        data: {
          email: this.email,
        },
      });
      return {
        success: true,
      };
    } catch (e) {
      throw Error(e.message);
    }
  },
};
