const fs = require("fs");
const path = require("path");
const TurndownService = require('turndown')
// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')


/**
 * Get the id of the youtube vid
 * Supports:
 * http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
 * http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
 * http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
 * http://www.youtube.com/embed/0zM3nApSvMg?rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg
 * http://youtu.be/0zM3nApSvMg
 * 
 */
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}


/**
 * Get the id of the Vimeo 
 */
function GetVimeoIDbyUrl(url) {

  var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  var match = url.match(regExp);

  if (match) {
    return match[2];

  }
}


async function getItems(url, token, items = [], offset = 0) {
  const config = {
    params: {
      offset: offset
    },
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept-version': '1.0.0',
    }
  };

  return await axios.get(
    url,
    config
  )
    .then(async response => {
      let data = response.data;
      items = [...items, ...response.data.items];
      let meta = { count: data.count, limit: data.limit, offset: data.offset, total: data.total }
      if (meta.count >= meta.limit) {
        return await getItems(url, token, items, meta.count)
      } else {
        return items;
      }
    },
      (error) => {
        const status = error.response.status
        console.log(status)
      }
    );
}

module.exports = function (api) {

  api.loadSource(async actions => {

    const token = '8e947815f384fcb9147fa6e4657a4b45cd8345368b9249d3707da8c63c08ced0';

    genreItems = await getItems('https://api.webflow.com/collections/5e7e39f00adcdbab7e956666/items', token);
    audienceItems = await getItems('https://api.webflow.com/collections/5e74d1a9ef223561e3c7d618/items', token);

    videoItems = await getItems('https://api.webflow.com/collections/5e74d1a9ef2235c09ec7d619/items', token);
    const videoCollection = actions.addCollection({
      typeName: 'Video'
    })

    for (const genre of genreItems) {
      const genreTitle = genre.slug
      const content = `---
title: ${genreTitle}
---
`;

const filename = path.join(
  __dirname,
  `/genres/${genreTitle}.md`
  );

fs.writeFile(filename, content, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!", filename);
});




    }


    for (const item of videoItems) {
     
      /** Don't add post if in draft or if archived*/
      if (item._draft === true) continue
      if (item._archived === true) continue


      /**
       * Add genre name instead of id
       */
      const genre = genreItems.filter(genre => { return genre._id === item['genre-v2'] })

      /**
       * Add audience name instead of id
       */
      const audience = audienceItems.filter(audience => { return audience._id === item['category'] })



      /**
       * If no social image, change it with a stock image.
       * TODO: Still to be finished, have to add stock image. Now it just sets to null
      */

      let socialImage = null;
      if (item['social-share-image']) socialImage = item['social-share-image'].url





      /**
       * If youtube, get the id, and create embed link
       * 
      */
      let embedUrl = item['link-to-video'].url;
      if (item['link-to-video'].metadata.provider_name === 'YouTube') embedUrl = `https://www.youtube.com/embed/${youtube_parser(item['link-to-video'].url)}`
      if (item['link-to-video'].metadata.provider_name === 'Vimeo') embedUrl = `https://player.vimeo.com/video/${GetVimeoIDbyUrl(item['link-to-video'].url)}`




      /**
       * Webflow API to Netlify Markdown
       * Quickly wrote this in here, but should be an external service
       * TODO: convert to serverless function
       * Don't forget to delete packages (fs, path, turndown)
      */


      const turndownService = new TurndownService()
      turndownService.addRule('indentP', {
        filter: ['p'],
        replacement: function (content, node, options) {
          return '\n\n  ' + content
        }
      })
      turndownService.addRule('indentBr', {
        filter: ['br'],
        replacement: function (content, node, options) {
          return '\n  ' + content
        }
      })

      turndownService.addRule('indentH4 ', {
        filter: ['h4'],
        replacement: function (content, node, options) {
          return '\n\n  ####' + content
        }
      })


      turndownService.addRule('indentH5 ', {
        filter: ['h5'],
        replacement: function (content, node, options) {
          return '\n\n  #####' + content
        }
      })

      turndownService.addRule('li ', {
        filter: ['li'],
        replacement: function (content, node, options) {
          return '\n  * ' + content
        }
      })

      
      const turndowndedText = turndownService.turndown(item['video-notes'])
      const turndowndedInfo = turndownService.turndown(item['key-takeaways'])

      


    
      const content = `---
title: |-
  ${item.name}
descr: |-
${turndowndedInfo}
videoUrl: ${item['link-to-video'].url}
videoLength: ${item['video-length']}
socialDescr: |-
  ${item['social-share-description']}
socialImage: ${socialImage}
recordedAt: |-
  ${item['recorded-at']}
text: |-
${turndowndedText}
genre: ${genre[0].slug}
audience: ${audience[0].slug}
id: ${item._id}
age: ${item.age}
company: |-
  ${item.excerpt}
image: ${item.thumbnail.url}
---
`;



    const filename = path.join(
      __dirname,
      `/entries/${item.slug}.md`
      );

    fs.writeFile(filename, content, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!", filename);
    });
    




      /**
       * TODO:
       * Add default values
       */
      videoCollection.addNode({
        slug: item.slug,
        id: item._id,
        title: item.name,
        descr: item.excerpt,
        video: {
          url: item['link-to-video'].url,
          provider: item['link-to-video'].metadata.provider_name,
          length: item['video-length'],
          embedUrl: embedUrl
        },
        social: {
          descr: item['social-share-description'],
          image: socialImage
        },
        age: item.age,
        info: item['key-takeaways'],
        recordedAt: item['recorded-at'],
        thumbnail: item.thumbnail.url,
        text: item['video-notes'],
        genre: genre[0].name,
        audience: audience[0].name,
        company: item.excerpt,
      })
    }

  })

  // api.loadSource(async store => {
  //   store.addMetadata('genres', genres)
  // })

}
