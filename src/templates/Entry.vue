<template>
  <Layout> 

    <div class="section">
      <div class="cc-container">
        <div class="video-wrapper-large">
          <div class='embed-container'>
            
            <iframe scrolling="no" title="Video embed" frameborder="0" allow="autoplay; fullscreen"  :src="$page.entry.video.embedUrl" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section cc-page__content">
      <!-- {{ $page.entry }} -->
      
      <div class="cc-container">
        <div class="grid-sidebar">
          <div>
            <div class="content-intro">
              <p class="text-large cc-video__company"></p>
              <h1 class="heading-lg">{{ $page.entry.title }}</h1>
            </div>
            <div data-duration-in="300" data-duration-out="100" class="tabs w-tabs">

              <div class="w-tab-content">
                <div data-w-tab="Video Notes" class="w-tab-pane w--tab-active">
                  <div class="video-notes w-richtext"></div>
                </div>
                <div data-w-tab="Transcript" class="w-tab-pane">
                  <div class="video-transcript w-richtext"></div>
                </div>
              </div>
            </div>
            <div class="w-richtext" v-html="$page.entry.text"></div>
          </div>
          <div>
            <div class="sticky">
              <div class="card-wrapper margin-bottom-large">
                <div class="key-takeaways w-richtext">
                  <div v-html="$page.entry.info"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <cc-videos></cc-videos>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  entry: video(id: $id) {
    slug,
    id
    title,
    descr,
    age
    video {
      url,
      provider,
      length,
      embedUrl
    },
    social {
      descr,
      image
    },
    info,
    recordedAt,
    thumbnail,
    text,
    genre,
    audience,
    company,
  }
}
</page-query>

<script>
import ccVideos from "~/components/cc-videos.vue";
export default {
  components: {
    ccVideos
  },
  // metaInfo: {
  //   title: "Hello, world!"
  // },
  // data() {
  //   return {
  //     otherPage: null
  //   };
  // },
  mounted() {
    // console.log(this.$page.videos.edges);
    console.log('test')
    // this.$gtm.trackView('MyScreenName', 'currentpath');
     
  }
};
</script>

<style scoped>
.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

</style>