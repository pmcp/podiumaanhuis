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
        // 'remark-frontmatter'
      ]
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'pages/**/*.md',
        typeName: 'MDPages',
        coverField: 'image', // What frontmatter fields to check for image paths fixings
        remark: {
          // remark options
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'homepage/home.md',
        typeName: 'homepages',
        coverField: 'heroImage', // What frontmatter fields to check for image paths fixings
        remark: {
          // remark options
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'entries/**/*.md',
        typeName: 'entries',
        // coverField: 'image', // What frontmatter fields to check for image paths fixings
        remark: {
          plugins: [
            // 'remark-frontmatter'
          ]
        }
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms-paths',
      options: {
        contentTypes: ['entries', 'MDPages', 'homepages']
      }
    },
    {
      use: '@noxify/gridsome-plugin-remote-image',
      options: {
        'typeName' : 'entries',
        'sourceField': 'image',
        'targetField': 'imageDownloaded',
        'targetPath': './src/assets/remoteImages'
      }
    },
  ],
  templates: {
    entries: [
      {
        path: '/voorstellingen/:title',
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
