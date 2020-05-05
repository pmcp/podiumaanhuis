import '~/assets/style/normalize.css'
import '~/assets/style/webflow.css'
import '~/assets/style/podiumaanhuis.webflow.css'
import '~/assets/style/cc.tweaks.css'

import VueGtag from 'vue-gtag'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  if (isClient) {
    Vue.use(
      VueGtag,
      {
        config: { id: 'GTM-5TGPDTT' }
      },
      router
    )
  }
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout),
  
  head.bodyAttrs = { class: 'body' },
  // Script for the identity provider of netlify (for cms)
  head.script.push({
    src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
    body: true
  }),
  // Script that checks if logged in and sends user to admin screen
  head.script.push({
    innerHTML: `console.log(window.netlifyIdentity)
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          console.log(user)
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }`,
    body: true
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  })
}



