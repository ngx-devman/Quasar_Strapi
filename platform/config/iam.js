module.exports = ({env}) => {
  return {
    url: env('IAM_SERVER_URL')
  }
}