module.exports = ({ env }) => ({
  upload: {
    provider: "google-cloud-storage",
    providerOptions: {
      serviceAccount: env.json("GCP_SERVICE_ACCOUNT"),
      bucketName: env("GCP_BUCKET_NAME"),
      publicFiles: false,
      uniform: false,
      basePath: "/uploads",
    },
  },
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("SENDGRID_EMAIL", "hello@sourcedigital.net"),
      defaultReplyTo: env("SENDGRID_EMAIL", "hello@sourcedigital.net"),
    },
  },
});
