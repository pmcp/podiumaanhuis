<template>
  <Layout>
    
      <!-- <div class="section">
      <div class="container w-container">
        <div class="rounded"><img src="images/De-tuin-van-de-walvis_banner.jpg" width="1500" srcset="images/De-tuin-van-de-walvis_banner-p-500.jpeg 500w, images/De-tuin-van-de-walvis_banner.jpg 800w" sizes="(max-width: 479px) 93vw, 95vw" alt="" class="image"></div>
        <div class="div-block-7">
          <div class="credit__container">
            <div class="credit__first">Beeld uit</div>
            <div class="credit__text">De tuin van de walvis, beeldsmederij DE MAAN</div>
          </div>
          <div class="credit__container">
            <div class="credit__first">©<br></div>
            <div class="credit__text"></div>
          </div>
        </div>
      </div>
      <div class="container hero-container">
        <div class="section-hero">
          <h2 class="cc-heading--left">Haal voorstellingen naar je huiskamer </h2>
          <p class="paragraph">Bekijk gratis opnames van straffe podiumvoorstellingen voor jong en oud. Elke dag komen er nieuwe bij. Via Podium Aan Huis bundelen gezelschappen, kunst- en cultuurhuizen virtueel de krachten om jou te blijven ontroeren en ontspannen. Door de coronacrisis is de magie van de live beleving even onbereikbaar. Geen nood, want als de zalen moeten sluiten, dan komt de voorstelling gewoon naar je toe. Veel kijkplezier!</p>
        </div>
      </div>
    </div>

    <cc-videos></cc-videos>
    </div>

  </Layout>
</template>






<script>
import ccVideos from "~/components/cc-videos.vue";
export default {
  components: {
    ccVideos
  },
  metaInfo: {
    title: "Hello, world!"
  },
  data() {
    return {
      otherPage: null
    };
  },
  mounted() {
    // console.log(this.$page.videos.edges);
  }
};
</script>
