import '~/assets/style/normalize.css'
import '~/assets/style/webflow.css'
import '~/assets/style/podiumaanhuis.webflow.css'
import '~/assets/style/cc.tweaks.css'


import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
