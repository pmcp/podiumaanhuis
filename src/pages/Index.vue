<template>
  <Layout>
    
    <!-- {{ c }} -->
    <!-- {{ $page.home }} -->
      <div class="section">
      <div class="container w-container">
        <div class="rounded"><g-image :src="heroImage" width="1500"/></div>
        <div class="div-block-7">
          <div class="credit__container">
            <div class="credit__text" style="white-space: pre;" v-html="$page.home.heroCredit"></div>
          </div>
        </div>
      </div>
      <div class="container hero-container">
        <div class="section-hero">
          <h2 class="cc-heading--left">{{ $page.home.title }}</h2>
          <p class="paragraph" >{{ $page.home.intro }}</p>
        </div>
      </div>
    </div>
    <cc-videos></cc-videos>
    

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
      heroCredit
    }
  }	
</page-query>




<script>
import ccVideos from "~/components/cc-videos.vue";
export default {
  components: {
    ccVideos
  },
  metaInfo: {
    title: "Podium Aan Huis - Home"
  },
  data() {
    return {
      otherPage: null
    };
  },
  computed: {
    heroImage () {
      return require('~/assets' + this.$page.home.heroImage)
    }
  }
}
</script>
