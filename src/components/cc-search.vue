<template>
  <div
    @keydown.down="increment"
    @keydown.up="decrement"
  >
    <!-- TODO: zoeken wissen -->
    <label class="relative block">Zoek</label>
    <input
      ref="input"
      type="search"
      :value="query"
      class="cc-form__input w-input"
      :class="{'search--focused': focused === true }"
      placeholder=""
      @focus="focused = true"
      @input="focusIndex = -1; query = $event.target.value"
      @change="query = $event.target.value"

      style="background-color:#e8edf4"
    />

    <div
      v-if="showResult"
      class="w-dyn-list"
    >
      <div class="grid-column w-dyn-items">
        <div v-if="results.length === 0">
          Geen resultaten voor <span class="font-bold">{{ query }}</span>.
        </div>
        <div
          class="w-dyn-item"
          v-else
          v-for="(result, index) in results"
          :key="result.id"
          @mouseenter="focusIndex = index"
        >
          <g-link
            :to="result.item.path"
            class="video-card-horizontal w-inline-block"
          >
            <div
              class="card-horizontal-image"
              style="position:relative"
            >
              
            <!-- <g-image v-if="result.item.imageDownloaded" :src="result.item.imageDownloaded" width="400" height="100" style="position:absolute;height: 100%;width: 100%;object-fit: cover;"/>
            <g-image v-else-if="result.item.image" :src="result.item.image" width="400" height="300" style="position:absolute;height: 100%;width: 100%;object-fit: cover;"/> -->
            <g-image v-if="result.item.image" :src="result.item.image" width="400" height="300" style="position:absolute;height: 100%;width: 100%;object-fit: cover;"/>
            <!-- TODO: add placeholder image -->
            <div v-else style="position:absolute;height: 100%;width: 100%;object-fit: cover;"></div>
                    
              <div class="card-horizontal-image-inner" style="position:relative">
 
              </div>
            </div>

            <div
              class="card-body"
              style="padding-top:10px;padding-bottom:10px"
            >
              <h3 style="margin-bottom: 10px;"> {{ result.item.title}}</h3>
              <p style="margin-bottom: 0;" v-if="result.item.company !== 'undefined' && result.item.company !== ''"> {{ result.item.company}}</p>
              <p style="margin-bottom: 0;" v-if="result.item.recordedAt !== 'undefined' && result.item.recordedAt !== ''"> {{ result.item.recordedAt}}</p>
              <!-- <div class="video-card-length">{{ result.item.video.length }}</div> -->
            </div>
          </g-link>
        </div>

      </div>
    </div>
  </div>
</template>


<static-query>
query Search{
  video: allEntries {
    edges {
      node {
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
  }
}
</static-query>

<script>
// import Fuse from "fuse.js";
export default {
  components: {},
  data() {
    return {
      query: "",
      focusIndex: -1,
      focused: false,
      timeout: ""
    };
  },
  computed: {
    results() {
      const fuse = new Fuse(this.headings, {
        keys: ["title", "descr", "company"],
        threshold: 0.25
      });
      return fuse.search(this.query).slice(0, 15);
    },
    headings() {
      let result = []
      const allPages = this.$static.video.edges.map(edge => edge.node);
      return allPages;
      return result;
    },
    showResult() {
      // Show results, if the input is focused and the query is not empty.
      // return this.focused && this.query.length > 0;
      return this.query.length > 0;
    }
  },  
  watch: {
    query(newValue, oldValue) {
      // Send query to gtm
      // TODO: This is very dirty
      clearTimeout(this.timeout);
      if(newValue === undefined|| newValue === undefined || newValue === '') return;
       this.timeout = setTimeout(() => {
          this.$gtm.trackEvent({
            event: 'search',
            searchValue: newValue,
      });
      }, 1000);
    },
    '$route' (to, from) {
      /**
      * Watching what route we are going to. If "home", rest filters
      */
      if(to.fullPath === '/') {
        this.query = ""
      }
    }
  },
  methods: {
    increment() {
      if (this.Z < this.results.length - 1) {
        this.focusIndex++;
      }
    },
    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--;
      }
    },
    // go() {
    //   // Do nothing if we don't have results.
    //   if (this.results.length === 0) {
    //     return;
    //   }
    //   let result;
    //   // If we don't have focus on a result, just navigate to the first one.
    //   if (this.focusIndex === -1) {
    //     result = this.results[0];
    //   } else {
    //     result = this.results[this.focusIndex];
    //   }
      
    //   this.$router.push(result.path + result.anchor);
    //   // Unfocus the input and reset the query.
    //   this.$refs.input.blur();
    //   this.query = "";
    // }
  }
};
</script>

<style>
.cc-video-card-image-wrapper {
  display: block;
  overflow: hidden;
  height: 194px;
  justify-content: flex-end;
  align-items: stretch;
  border-bottom: 6px solid #fc2d75;
  border-radius: 10px 10px 0px 0px;
  background-position: 50% 50%;
  background-size: cover;
  object-fit: cover;
}

</style>