module.exports = ({ env }) => ({
  authRedirectUrl: `http://${env("HOST", "localhost")}:${env.int("PORT", 1337)}`
});
