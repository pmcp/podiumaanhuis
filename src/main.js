import '~/assets/style/normalize.css'
import '~/assets/style/webflow.css'
import '~/assets/style/podiumaanhuis.webflow.css'
import '~/assets/style/cc.tweaks.css'

// Tag manager
// import VueGtm from 'vue-gtm'




import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {

  // Set default layout as a global component
  // if (isClient) {
  //   console.log(isClient)
  //   Vue.use(VueGtm, {
  //     id: 'GTM-5TGPDTT',
  //     enabled: true,
  //     debug: true,
  //     vueRouter: router
  //   })
  // }

  Vue.component('Layout', DefaultLayout),
  
  head.bodyAttrs = { class: 'body' },
  // Script for the identity provider of netlify (for cms)
  head.script.push({
    src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
    body: true
  }),
    head.script.push({
    src: 'https://cdn.jsdelivr.net/npm/showdown@1.9.0/dist/showdown.min.js',
    body: true
  }),
    head.script.push({
    src: 'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js',
    body: true
  }),
  // Script that checks if logged in and sends user to admin screen of Netlify CMS (/admin)
  // head.script.push({
  //   innerHTML: `if (window.netlifyIdentity) {
      
  //     window.netlifyIdentity.on("init", user => {
  //       if (!user) {
  //         console.log(user)
  //         window.netlifyIdentity.on("login", () => {
  //           document.location.href = "/admin/";
  //         });
  //       }
  //     });
  //   }`,
  //   body: true
  // })
  // MY google font, bruv
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  })
  // head.script.push({
  //   innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  //   })(window,document,'script','dataLayer','GTM-5TGPDTT');`,
  //   body: true
  // })

}



