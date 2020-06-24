const showdown  = require('showdown');
/**
 * Get the id of the youtube vid
 */
function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}

 
/**
 * Get the id of the Vimeo 
 */
function vimeoParser(url) {

  var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  var match = url.match(regExp);

  if (match) {
    return match[2];

  }
}

/**
 * Markdown Converter with extra option: external links open in new tab
 */
const converter = new showdown.Converter();
      converter.addExtension(function () {
        return [{
            type: 'output',
            regex: /<a\shref[^>]+>/g,
            replace : function (text) {
                var url = text.match(/"(.*?)"/)[1]
                if(url.includes('podiumaanhuis') || url[0] == '/' || url[0] == '.' || url[0] == '#'){
                    return text
                }
                return '<a href="' + url + '" target="_blank">'
            }
        }]
      }, 'externalLink')


module.exports = function (api) {

// {
//   id: '5e8c87d0f0f88e8fe9ca5893',
//   '$uid': '30806d05971646711bfb8416e09b8813',
//   internal: {
//     typeName: 'entries',
//     origin: '/Users/pmcp/dev/Podiumaanhuis/podiumaanhuis/entries/what-the-body-does-not-remember.md',
//     mimeType: 'text/markdown',
//     content: '---\ntitle: |-\n  What the body does not remember\ndescr: |-\n  * dans\n  * ' +
//       'leeftijd: 18+\n  * duur:  96 min\n  * taal: Engels\n  * [Ultima ' +
//       'Vez](http://www.ultimavez.com/)\n  * [Ictus](https://www.ictus.be/) ‍\n' +
//       'videoUrl: https://vimeo.com/ultimavez/whatthebodylive\nvideoLength: 96 ' +
//       'min\nsocialDescr: |-\n  Het debuut van Wim Vandekeybus en Ultima Vez uit ' +
//       '1987 sloeg de toenmalige danswereld met verstomming. Vandekeybus en ' +
//       'componisten Thierry de Mey en Peter Vermeersch kregen in New York de ' +
//       'gerenommeerde Bessie Award voor deze “brutale confrontatie van dans en ' +
//       'muziek”. In 2013, 25 jaar later en met een nieuwe cast, ging de ' +
//       'voorstelling opnieuw op tournee over de hele wereld. Vandekeybus’ ' +
//       'eerste choreografie balanceert op de messcherpe grens van aantrekken en ' +
//       'afstoten. Nu eens levert dat een confrontatie van twee dansers op, dan ' +
//       'van twee groepen, van de dansers en de muziek, van de dansers en een ' +
//       'dwingend lijnenspel.\nsocialImage: ' +
//       'https://uploads-ssl.webflow.com/5e8c86a2e226b18f5f2514d4_What%20the%20Body%C2%A9DannyWillems-5705.jpg\n' +
//       'recordedAt: |-\n  Opname in KVS, Brussel\ntext: |-\n  Het debuut van Wim ' +
//       'Vandekeybus en Ultima Vez uit 1987 sloeg de toenmalige danswereld met ' +
//       'verstomming. Vandekeybus en componisten Thierry de Mey en Peter ' +
//       'Vermeersch kregen in New York de gerenommeerde Bessie Award voor deze ' +
//       '“brutale confrontatie van dans en muziek”.\n  \n  In 2013, 25 jaar later ' +
//       'en met een nieuwe cast, ging de voorstelling opnieuw op tournee over de ' +
//       'hele wereld. Vandekeybus’ eerste choreografie balanceert op de ' +
//       'messcherpe grens van aantrekken en afstoten. Nu eens levert dat een ' +
//       'confrontatie van twee dansers op, dan van twee groepen, van de dansers ' +
//       'en de muziek, van de dansers en een dwingend lijnenspel.\n  \n  Vanaf ' +
//       'eind 2013 wordt ‘What the Body Does Not Remember’ ook uitgevoerd met ' +
//       'live muziek, uitgevoerd door het Brussels hedendaags muziekensemble ' +
//       'Ictus.\n\n  **Credits**\n\n  REGIE, CHOREOGRAFIE en SCENOGRAFIE\n  Wim ' +
//       'Vandekeybus\n  \n  UITGEVOERD DOOR\n  Jorge Jauregui Allue, Aymara Parola, ' +
//       'Eddie Oroyan, Pavel Mašek, Revé Terborg, German Jauregui Allue, Guilhem ' +
//       'Chatir, Claire Lamothe, Léa Dubois\n  \n  OOK UITGEVOERD DOOR\n  Damien ' +
//       'Chapelle, Ricardo Ambrozio, Tanja Marín Friðjónsdóttir, Zebastián ' +
//       'Méndez Marín, Maria Kolegova, Livia Balazova, Rob Hayden, Nicolas ' +
//       'Grimaldi Capitello\n  \n  ORIGINELE MUZIEK\n  Thierry De Mey & Peter ' +
//       'Vermeersch\n  \n  REPETITOR\n  Eduardo Torroja\n  \n  STYLING\n  Isabelle ' +
//       'Lhoas GEASSISTEERD DOOR Frédérick Denis, Isabelle De Cannière\n  \n  ' +
//       'TECHNISCHE COORDINATIE\n  Davy Deschepper\n  \n  LICHTONTWERP\n  Francis ' +
//       'Gahide\n  \n  LICHT OP TOURNEE\n  Davy Deschepper, Karin Demedts\n  \n  ' +
//       'GELUID OP TOURNEE\n  Davy Deschepper, Bram Moriau, Tom Buys\n\n  FOTO\n  ' +
//       'Danny Willems\n\n  PRODUCTIE\n  Ultima Vez\n  \n  CO-PRODUCTIE\n  KVS\n  \n  ' +
//       'MET DE STEUN VAN\n  Charleroi Danses, Centre Chorégraphique de la ' +
//       'Fédération Wallonie-Bruxelles\n  \n  MET DANK AAN\n  Louise De Neef, ' +
//       'Benjamin Dandoy\n\n  ‍\ngenre: dans\naudience: volwassenen\nid: ' +
//       '5e8c87d0f0f88e8fe9ca5893\nage: undefined\ncompany: |-\n  Ultima Vez / Wim ' +
//       'Vandekeybus & Ictus\nimage: ' +
//       'https://uploads-ssl.webflow.com/5e8c86a2e226b18f5f2514d4_What%20the%20Body%C2%A9DannyWillems-5705.jpg\n' +
//       '---\n',
//     timestamp: 1588948516409,
//     publicPath: { default: '/voorstellingen/what-the-body-does-not-remember/' }
//   },
//   path: '/voorstellingen/what-the-body-does-not-remember/',
//   fileInfo: {
//     extension: '.md',
//     directory: 'entries',
//     path: 'entries/what-the-body-does-not-remember.md',
//     name: 'what-the-body-does-not-remember'
//   },
//   content: '',
//   excerpt: '',
//   title: 'What the body does not remember',
//   descr: '* dans\n* leeftijd: 18+\n* duur:  96 min\n* taal: Engels\n* [Ultima ' +
//     'Vez](http://www.ultimavez.com/)\n* [Ictus](https://www.ictus.be/) ' +
//     '‍',
//   videoUrl: 'https://vimeo.com/ultimavez/whatthebodylive',
//   videoLength: '96 min',
//   socialDescr: 'Het debuut van Wim Vandekeybus en Ultima Vez uit 1987 sloeg de ' +
//     'toenmalige danswereld met verstomming. Vandekeybus en componisten ' +
//     'Thierry de Mey en Peter Vermeersch kregen in New York de ' +
//     'gerenommeerde Bessie Award voor deze “brutale confrontatie van dans ' +
//     'en muziek”. In 2013, 25 jaar later en met een nieuwe cast, ging de ' +
//     'voorstelling opnieuw op tournee over de hele wereld. Vandekeybus’ ' +
//     'eerste choreografie balanceert op de messcherpe grens van aantrekken ' +
//     'en afstoten. Nu eens levert dat een confrontatie van twee dansers op, ' +
//     'dan van twee groepen, van de dansers en de muziek, van de dansers en ' +
//     'een dwingend lijnenspel.',
//   socialImage: 'https://uploads-ssl.webflow.com/5e8c86a2e226b18f5f2514d4_What%20the%20Body%C2%A9DannyWillems-5705.jpg',
//   recordedAt: 'Opname in KVS, Brussel',
//   text: 'Het debuut van Wim Vandekeybus en Ultima Vez uit 1987 sloeg de ' +
//     'toenmalige danswereld met verstomming. Vandekeybus en componisten ' +
//     'Thierry de Mey en Peter Vermeersch kregen in New York de gerenommeerde ' +
//     'Bessie Award voor deze “brutale confrontatie van dans en muziek”.\n\nIn ' +
//     '2013, 25 jaar later en met een nieuwe cast, ging de voorstelling opnieuw ' +
//     'op tournee over de hele wereld. Vandekeybus’ eerste choreografie ' +
//     'balanceert op de messcherpe grens van aantrekken en afstoten. Nu eens ' +
//     'levert dat een confrontatie van twee dansers op, dan van twee groepen, ' +
//     'van de dansers en de muziek, van de dansers en een dwingend lijnenspel.\n\n' +
//     'Vanaf eind 2013 wordt ‘What the Body Does Not Remember’ ook uitgevoerd ' +
//     'met live muziek, uitgevoerd door het Brussels hedendaags muziekensemble ' +
//     'Ictus.\n\n**Credits**\n\nREGIE, CHOREOGRAFIE en SCENOGRAFIE\nWim Vandekeybus\n\n' +
//     'UITGEVOERD DOOR\nJorge Jauregui Allue, Aymara Parola, Eddie Oroyan, Pavel ' +
//     'Mašek, Revé Terborg, German Jauregui Allue, Guilhem Chatir, Claire ' +
//     'Lamothe, Léa Dubois\n\nOOK UITGEVOERD DOOR\nDamien Chapelle, Ricardo ' +
//     'Ambrozio, Tanja Marín Friðjónsdóttir, Zebastián Méndez Marín, Maria ' +
//     'Kolegova, Livia Balazova, Rob Hayden, Nicolas Grimaldi Capitello\n\n' +
//     'ORIGINELE MUZIEK\nThierry De Mey & Peter Vermeersch\n\nREPETITOR\nEduardo ' +
//     'Torroja\n\nSTYLING\nIsabelle Lhoas GEASSISTEERD DOOR Frédérick Denis, ' +
//     'Isabelle De Cannière\n\nTECHNISCHE COORDINATIE\nDavy Deschepper\n\n' +
//     'LICHTONTWERP\nFrancis Gahide\n\nLICHT OP TOURNEE\nDavy Deschepper, Karin ' +
//     'Demedts\n\nGELUID OP TOURNEE\nDavy Deschepper, Bram Moriau, Tom Buys\n\nFOTO\n' +
//     'Danny Willems\n\nPRODUCTIE\nUltima Vez\n\nCO-PRODUCTIE\nKVS\n\nMET DE STEUN VAN\n' +
//     'Charleroi Danses, Centre Chorégraphique de la Fédération ' +
//     'Wallonie-Bruxelles\n\nMET DANK AAN\nLouise De Neef, Benjamin Dandoy\n\n‍',
//   genre: 'dans',
//   audience: 'volwassenen',
//   age: 'undefined',
//   company: 'Ultima Vez / Wim Vandekeybus & Ictus',
//   image: 'https://uploads-ssl.webflow.com/5e8c86a2e226b18f5f2514d4_What%20the%20Body%C2%A9DannyWillems-5705.jpg',
//   imageDownloaded: '/Users/pmcp/dev/Podiumaanhuis/podiumaanhuis/src/assets/remoteImages/f8cb9bda5d40f8b667133974eedbdb32e092419db79f8c287bc15404c60136ab.jpg'
// }

  api.onCreateNode(node => {
    // TODO: arrange  with env variable, PRODUCTION vs DRAFT,  so code is same for live  & draft

    if(node.id === 'eae09f9aaa3a0e32f072f0955457f7e2') {
      node.notificationText = converter.makeHtml(node.notificationText);
    }
    // if (node.internal.typeName === 'entries') {

    // }
    /**
     * Don't proceed if entry is in draft mode -> Not used in staging.
     */


    if (process.env.DRAFT === 'false' && node.internal.typeName === 'entries' && node.draft === true) return null


     /* Clean some stuff up if this is a video entry
     */
    if (node.internal.typeName === 'entries') {
      /**
       * Convert all frontmatter  markdown
       */
      node.text = converter.makeHtml(node.text);
      node.descr = converter.makeHtml(node.descr);

      /**
       * Get youtube & Vimeo embed urls
       */ 
      if(node.videoUrl !== undefined) {    
        const getIdYoutube = youtubeParser(node.videoUrl)
        if(getIdYoutube) node.videoUrl = `https://www.youtube.com/embed/${getIdYoutube}`
        const getVimeoId = vimeoParser(node.videoUrl)
        if(getVimeoId) node.videoUrl = `https://player.vimeo.com/video/${getVimeoId}`
      }
    }
  })
}
