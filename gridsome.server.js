
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

  // let genres = [];
  // audience: [
  //   {
  //     name: 'volwassenen',
  //     order: 0,
  //     active: true
  //   },
  //   {
  //     name: 'familie',
  //     order: 1,
  //     active: true
  //   }
  // ]

  api.loadSource(async actions => {

    const token = '8e947815f384fcb9147fa6e4657a4b45cd8345368b9249d3707da8c63c08ced0';

    genreItems = await getItems('https://api.webflow.com/collections/5e7e39f00adcdbab7e956666/items', token);
    audienceItems = await getItems('https://api.webflow.com/collections/5e74d1a9ef223561e3c7d618/items', token);

    videoItems = await getItems('https://api.webflow.com/collections/5e74d1a9ef2235c09ec7d619/items', token);
    const videoCollection = actions.addCollection({
      typeName: 'Video'
    })



    for (const item of videoItems) {
      // {
      //   "_archived": false,
      //   "_draft": false,
      //   "link-to-video": {
      //     "url": "https://vimeo.com/219735823",
      //     "metadata": {
      //       "width": 1920,
      //       "height": 1080,
      //       "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F219735823%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F219735823&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F878708378_1280.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo\" width=\"1920\" height=\"1080\" scrolling=\"no\" title=\"Vimeo embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
      //       "aspectRatio": 0,
      //       "title": "3ACH full video",
      //       "provider_name": "Vimeo",
      //       "type": "video",
      //       "thumbnail_url": "https://i.vimeocdn.com/video/878708378_1280.jpg",
      //       "description": "Zonzo Compagnie conquers the world with intriguing performances about the work of fascinating musicians and composers. Earlier on, the music of John Cage, Miles Davis and Luciano Berio were unpacked and tackled, now it's Johann Sebastian Bach's turn. Bach is a monument.",
      //       "author_name": "Zonzo Compagnie"
      //     }
      //   },
      //   "excerpt": "Zonzo Compagnie",
      //   "name": "3ACH",
      //   "social-share-description": "Zonzo Compagnie voert in 3ACH twee violisten op die je meenemen in de wereld van Bach. Ze weven Bachs melodieën langs onnavolgbare harmonieën. Ze staan midden in een videodecor dat door een wonderlijke kinderwereld wordt bevolkt. Samen ontdekken ze muziek die volgens velen de mooiste is die ooit werd geschreven.",
      //   "video-notes": "<p>Zonzo Compagnie verovert de wereld met intrigerende voorstellingen over het werk van fascinerende muzikanten en componisten. Eerder werd de muziek van John Cage, Miles Davis en Luciano Berio uitgepakt en aangepakt, nu is Johann Sebastian Bach aan de beurt. Bach is een monument, een tovenaar met klank en melodieën, een genie dat duizelingwekkende fuga’s, preludes, koralen en partita’s aan elkaar reeg en 250 jaar na zijn dood nog steeds de hitparades aanvoert.</p><p>Zonzo Compagnie voert in 3ACH twee violisten op die je meenemen in de wereld van Bach. Ze weven Bachs melodieën langs onnavolgbare harmonieën. Ze staan midden in een videodecor dat door een wonderlijke kinderwereld wordt bevolkt. Samen ontdekken ze muziek die volgens velen de mooiste is die ooit werd geschreven.</p><p>\"Twee violen, twee videoschermen: meer heeft Zonzo Compagnie niet nodig voor onversneden muzikale verwondering.\"(De Standaard ****)</p><p>De muziek van Bach wordt vervlochten met die van Piet-Jan Van Rossum, één van de meest smaakmakende componisten in Nederland die voor 3ACH een eigen interpretatie maakte van Bachs werk, en met de fascinerende beelden van Ine Van Baelen en Stijn Grupping, bekend van het aanstormende jonge gezelschap Post Uit Hessdalen. De regie is in handen van Wouter Van Looy, artistiek leider van Zonzo Compagnie, die tal van 5-sterren recensies in de wacht sleepte voor zijn regie van ondermeer Earth Diver (Ruhrtriennale / Muziektheater Transparant) en Die Zauberflöte (Luzerner Theater)</p><p>‍</p><p><strong>Credits</strong></p><p>WOUTER VAN LOOY regie &amp; decor JOHANN SEBASTIAN BACH &amp; PIET-JAN VAN ROSSUM muziek INE VAN BAELEN &amp; STIJN GRUPPING video CAECILIA THUNISSEN muzikale dramaturgie JOHANNA TRUDZINSKI kostuums PIETER NYS technisch ontwerp </p><p>Gespeeld door 2 violistes: Cynthia Freivogel, Ryuko Reid, Lucia Giraudo, Sara Decorso, Lidewij Vandervoort, Madoka Nakamaru of Sara DeCorso</p><p>Acteurs en actrices film: Brent Simons, Joshua Tassin, Victor Van Looy, Julian Cuevas, Lou Van De Noortgate, Morris Van De Noortgate, Luisa Noviello, Astor Noviello, Tiana Yalina Oliveira &amp; Cassie Alcendor</p><p><em>Een productie van Zonzo Compagnie in coproductie met BIG BANG Festival, Concertgebouw Brugge, BOZAR en Oorkaan. Met de steun van het Creative Europe Programme van de Europese Unie, Vlaanderen, Provincie Antwerpen en het Fonds Podiumkunsten.</em></p><p>Credits captatie: Motormusic</p>",
      //   "key-takeaways": "<ul><li>muziektheater</li><li>leeftijd: 6+</li><li>duur: 53 min</li><li><a href=\"http://www.zonzocompagnie.be\" target=\"_blank\">Zonzo Compagnie</a>‍</li></ul>",
      //   "video-length": "53 min",
      //   "age": "6+",
      //   "thumbnail": {
      //     "fileId": "5e971859e327e312f33e78c8",
      //     "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e971859e327e312f33e78c8_zonzo_3ach_c_driessegers_web.jpg",
      //     "alt": null
      //   },
      //   "slug": "3ach",
      //   "social-share-image": {
      //     "fileId": "5e971859e327e312f33e78c8",
      //     "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e971859e327e312f33e78c8_zonzo_3ach_c_driessegers_web.jpg",
      //     "alt": null
      //   },
      //   "genre-v2": "5e7e3eed0a1abb2190eb7c26",
      //   "category": "5e74d76a323fa1246360d029",
      //   "updated-on": "2020-04-15T14:28:18.491Z",
      //   "updated-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      //   "created-on": "2020-04-15T14:25:10.865Z",
      //   "created-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      //   "published-on": "2020-04-15T14:28:21.745Z",
      //   "published-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      //   "_cid": "5e74d1a9ef2235c09ec7d619",
      //   "_id": "5e971946d0775216a6192711"
      // },

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
      const fs = require("fs");
      const path = require("path");
      const TurndownService = require('turndown')
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
title: '${item.name}'
id: '${item._id}'
descr: '${item.excerpt}'
age: '${item.age}'
videoUrl: '${item['link-to-video'].url}'
videoLength: '${item['video-length']}'
socialImage: '${socialImage}'
recordedAt: '${item['recorded-at']}'
company: '${item.excerpt}'
image: '${item.thumbnail.url}'
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
