<template>
  <Layout>

    <!-- {{ c }} -->
    <!-- {{ $page.home }} -->
    <div class="section">
      <div class="container w-container">
        <div class="rounded">
          <g-image
            :src="heroImage"
            width="1500"
          />
        </div>
        <div class="div-block-7">
          <div class="credit__container">
            <div
              class="credit__text"
              style="white-space: pre;"
              v-html="$page.home.heroCredit"
            ></div>
          </div>
        </div>
      </div>
      <div class="container hero-container">
        <div class="section-hero">
          <h2 class="cc-heading--left">{{ $page.home.title }}</h2>
          <p class="paragraph">{{ $page.home.intro }}</p>
        </div>
      </div>
    </div>

    <cc-videos></cc-videos>


    <div class="section">
      <div class="columns w-row">
        <div class="column cc-form__column w-col w-col-6">
          <div class="div-block-2">
            <h2 class="cc-form__title"><strong>{{ $page.home.formTitle }}</strong></h2>
            <p class="cc-form__text"></p>
            <p class="cc-feedback__text" style="white-space: pre-line;" v-html="$page.home.formText"></p>
          </div>
        </div>
        <div class="column-2 cc-form__column w-col w-col-6">
          <div class="container">
            <div class="form w-form">
              <cc-form></cc-form>
            
              <!-- <div class="empty-state-2 w-form-done">
                <div>Bedankt voor je feedback!<br></div>
              </div>
              <div class="error-message-2 w-form-fail">
                <div>Oeps, er ging iets fout bij het versturen van je bericht.</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    

  </Layout>
</template>


<page-query>
  query {
    home: mdPages(id: "7e4b4855d8becbeb699c887ba0c2fc82") {
      title
      id,
      content,
      intro,
      heroImage,
      heroCredit,
      formTitle,
      formText
    }
  }	
</page-query>




<script>
import ccVideos from "~/components/cc-videos.vue";
import ccForm from "~/components/cc-form.vue";
export default {
  components: {
    ccVideos,
    ccForm
  },
  metaInfo() {
    return {
      title: 'Podium Aan Huis',
      meta: [
        { name: "description", content: this.$page.home.intro },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: this.$page.home.intro},
        { name: "twitter:title", content: 'Podium Aan Huis' },
        // TODO: make a computed of this: if no social image, get thumbnail?
        { name: "twitter:image", content: this.heroImage },
        { property: "og:type", content: "article" },
        { property: "og:title", content: 'Podium Aan Huis' },
        { property: "og:description", content: this.$page.home.intro },
        {
          property: "og:url",
          content: `${this.getBaseUrl}`
        },
        // {
        //   property: "article:published_time",
        //   content: moment(this.$page.post.date).format("MM-DD-YYYY")
        // },
        // { property: "og:updated_time", content: this.$page.post.date },
        { property: "og:image", content: this.heroImage },
        { property: "og:image:secure_url", content: this.heroImage }
      ]
      // script: [{ src: "https://platform.twitter.com/widgets.js" }]
    };
  },
  computed: {
    heroImage() {
      return require("~/assets" + this.$page.home.heroImage);
    }
  }
};
</script>

