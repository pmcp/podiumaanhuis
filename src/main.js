import '~/assets/style/normalize.css'
import '~/assets/style/webflow.css'
import '~/assets/style/podiumaanhuis.webflow.css'
import '~/assets/style/cc.tweaks.css'


import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  head.bodyAttrs = { class: 'body' }
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  })
}



