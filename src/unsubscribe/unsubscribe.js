const axios = require("axios");

module.exports = {
  name: "Unsubscribe a user",
  description: "Unsubscribes a user from a campaign",
  key: "perkexchange-unsubscribe-action",
  version: "0.0.1",
  type: "action",
  props: {
    email: {
      type: "string",
      label: "Email",
    },
  },
  async run() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PERKEXCHANGE_CAMPAIGNSECRET}`,
    };

    let domain = process.env.PERKEXCHANGE_DOMAIN || "https://perk.exchange";

    axios
      .delete(
        `${domain}/api/rewards`,
        {
          email: this.email,
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
