export default function (Vue, { router }) {
  if(process.isClient) {
    const { default: VueGtm } = require('vue-gtm')
    Vue.use(VueGtm, {
      vueRouter: router,
      id: 'GTM-5TGPDTT',
      enabled: true,
      debug: true
    })
  }
}