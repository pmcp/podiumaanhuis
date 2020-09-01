<template>

  <div>
    <div class="section">
      <div class="container w-container" style="margin-bottom:0">
        <div class="rounded">
          
          <g-image
            :src="$page.home.heroImage.src"
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
      <div
        class="container hero-container"
        style="margin-bottom:0;"
      >
        <div class="section-hero">
          <h2 class="cc-heading--left">{{ $page.home.title }}</h2>
          <!-- <p class="paragraph">{{ $page.home.intro }}</p> -->

          <p class="paragraph">Podium Aan Huis was een tijdelijk platform met straffe podiumvoorstellingen. De magie van de live beleving was even onbereikbaar. Nu het nieuwe cultuurseizoen voorzichtig terug op gang komt hopen we je terug in de zalen te verwelkomen. Hopelijk tot snel!
</p>
          <!-- <cc-notification
          style="margin-bottom: 60px;margin-top: 35px;"
            v-if="$page.home.notificationActive"
            :inner="$page.home.notificationText"
          /> -->

          
          
        </div>
      </div>
    </div>
  </div>
</template>


<page-query>
  query {
    home: homepages(id: "eae09f9aaa3a0e32f072f0955457f7e2") {
      title
      id,
      content,
      intro,
      heroImage,
      heroCredit,
      formTitle,
      formText,
      notificationActive,
      notificationText
    }
  }	
</page-query>




<script>
import ccNotification from "@/components/cc-notification.vue";
export default {
  components: {
    ccNotification
  },
  metaInfo() {
    return {
      title: "Podium Aan Huis",
      meta: [
        { name: "description", content: this.$page.home.intro },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: this.$page.home.intro },
        { name: "twitter:title", content: "Podium Aan Huis" },
        // TODO: make a computed of this: if no social image, get thumbnail?
        { name: "twitter:image", content: this.$page.home.heroImage.src },
        { property: "og:type", content: "article" },
        { property: "og:title", content: "Podium Aan Huis" },
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
        { property: "og:image", content: this.$page.home.heroImage.src },
        {
          property: "og:image:secure_url",
          content: this.$page.home.heroImage.src
        }
      ]
      // script: [{ src: "https://platform.twitter.com/widgets.js" }]
    };
  },
  computed: {
    // heroImage() {
    //   return require("~/assets" + this.$page.home.heroImage);
    // }
  }
};
</script>