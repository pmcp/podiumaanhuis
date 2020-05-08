<template>
  <Layout>
    <router-view />
    <cc-videos></cc-videos>
    <div class="section" v-if="this.$route.name === 'home'">
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
<script>
import ccVideos from "~/components/cc-videos.vue";
import ccForm from "~/components/cc-form.vue";
export default {
  components: {
    ccVideos,
    ccForm
  }, 
  data() {
    return {
      foo: 'bar'
    }
  },
}
</script>