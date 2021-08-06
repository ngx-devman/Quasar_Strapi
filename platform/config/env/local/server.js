module.exports = ({ env }) => {
  return {
    admin: {
        auth: {
          secret: require("crypto").randomBytes(64).toString("base64"),
        },
      }
    }
};
