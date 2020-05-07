<template>
  <div
    @keydown.down="increment"
    @keydown.up="decrement"
    class="container-width-large"
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
              :style="{ backgroundImage: `url('${result.item.image}')`}"
              class="card-horizontal-image"
            >
              <div class="card-horizontal-image-inner">
                <!-- <div class="play-button small"><img
                    src="@/assets/images/play.svg"
                    alt=""
                    class="icon-small"
                  >
                </div> -->
              </div>
            </div>

            <div
              class="card-body"
              style="padding-top:10px;padding-bottom:10px"
            >
              <h3 style="margin-bottom: 10px;"> {{ result.item.title}}</h3>
              <p style="margin-bottom: 0;"> {{ result.item.company}}</p>
              <p style="margin-bottom: 0;"> {{ result.item.recordedAt}}</p>
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
import Fuse from "fuse.js";
export default {
  components: {},
  data() {
    return {
      query: "",
      focusIndex: -1,
      focused: false
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
      let result = [];

      const allPages = this.$static.video.edges.map(edge => edge.node);

      return allPages;
      // Create the array of all headings of all pages.
      // allPages.forEach(page => {
      //   result = [...result, {
      //     title: page.title,
      //     slug: page.slug }]
      //   // page.headings.forEach(heading => {
      //   //   result.push({
      //   //     ...heading,
      //   //     path: page.path,
      //   //     title: page.title
      //   //   });
      //   // });
      // });
      return result;
    },
    showResult() {
      // Show results, if the input is focused and the query is not empty.
      // return this.focused && this.query.length > 0;
      return this.query.length > 0;
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
    go() {
      // Do nothing if we don't have results.
      if (this.results.length === 0) {
        return;
      }
      let result;
      // If we don't have focus on a result, just navigate to the first one.
      if (this.focusIndex === -1) {
        result = this.results[0];
      } else {
        result = this.results[this.focusIndex];
      }
      this.$router.push(result.path + result.anchor);
      // Unfocus the input and reset the query.
      this.$refs.input.blur();
      this.query = "";
    }
  }
};
</script>

<style>
.search--focused {
  background-color: red;
}
</style>