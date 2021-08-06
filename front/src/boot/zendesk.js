import Zendesk from '@dansmaculotte/vue-zendesk'
export default ({ Vue }) => {
  Vue.use(Zendesk, {
    key: '9917360e-6929-4970-94cf-20c54cf31289',
    disabled: true,
    hideOnLoad: true,
    settings: {
      webWidget: {
        color: {
          theme: '#0D384D'
        }
      }
    }
  })
}
