<template>
  <div>
    <div class="section">
      <div class="cc-container" >
        <div class="video-wrapper-large" style="background-color:#e8edf4">
          <div class='embed-container'>
            <iframe scrolling="no" title="Video embed" frameborder="0" allow="autoplay; fullscreen"  :src="$page.entry.videoUrl" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="section cc-page__content">
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
          <!-- grid fix for ie11 -->
          <div style="-ms-grid-column: 2; -ms-grid-row: 1;">
            <div class="sticky">
              <div class="card-wrapper margin-bottom-large">
                <div class="key-takeaways w-richtext">

                  <div v-html="$page.entry.descr"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<page-query>
query ($id: ID!) {
  entry: entries(id: $id) {
    path,
    id,
    title,
    descr,
    age,
    videoUrl,
    videoLength
    socialImage,
    socialDescr
    descr,
    recordedAt,
    image,
    text,
    genre,
    audience,
    company,
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.entry.title,
      meta: [
        { name: "description", content: this.$page.entry.socialDescr },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: this.$page.entry.socialDesrc },
        { name: "twitter:title", content: this.$page.entry.title },
        // TODO: make a computed of this: if no social image, get thumbnail?
        { name: "twitter:image", content: this.$page.entry.socialImage },
        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.entry.title },
        { property: "og:description", content: this.$page.entry.socialDescr },
        {
          property: "og:url",
          content: `${this.getBaseUrl}${this.$page.entry.path}`
        },
        // {
        //   property: "article:published_time",
        //   content: moment(this.$page.post.date).format("MM-DD-YYYY")
        // },
        // { property: "og:updated_time", content: this.$page.post.date },
        { property: "og:image", content: this.$page.entry.socialImage },
        { property: "og:image:secure_url", content: this.$page.entry.socialImage }
      ]
      // script: [{ src: "https://platform.twitter.com/widgets.js" }]
    };
  },
};
</script>

<style scoped>
.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

</style>