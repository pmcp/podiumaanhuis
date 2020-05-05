// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Podium  Aan Huis',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'pages/**/*.md',
        typeName: 'MDPages'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'entries/**/*.md',
        typeName: 'entries',
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    }
  ],
  templates: {
    Video: [
      {
        path: '/voorstellingen/:slug',
        component: './src/templates/Entry.vue'
      }
    ],
    MDPages: [
      {
        path: '/:path',
        component: './src/templates/Page.vue'
      }
    ]
  }

}
