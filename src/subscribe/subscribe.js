const axios = require("axios");

module.exports = {
  name: "Create Subscription",
  description: "Subscribes a user to a campaign given their email address",
  key: "perkexchange-subscribe-action",
  version: "0.0.4",
  type: "action",
  props: {
    email: {
      type: "string",
      label: "Email",
    },
    amount: {
      type: "integer",
      label: "Amount",
      optional: true,
    },
  },
  async run() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PERKEXCHANGE_CAMPAIGNSECRET}`,
    };

    let domain = process.env.PERKEXCHANGE_DOMAIN || "https://perk.exchange";

    axios
      .post(
        `https://b928-2607-fea8-1da4-9e00-95ef-110e-b8bd-2cbd.ngrok.io/api/rewards`,
        {
          email: this.email,
          amount: this.amount || 0,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        throw new Error("Unexpected error ", error);
      });
  },
};
