<template>
  <div
    id="videos"
    class="section ccsection--videos"
  >
    <div
      v-if="filteredItems.length === 0"
      style="text-align:center;"
    >
      <cc-loader></cc-loader>
    </div>
    <div
      v-else
      class="container"
    >
      <h2 class="section-header-border">Video&#x27;s</h2>
      <div>

        <div class="cc-video__vue">
          <div class="container">
            <ClientOnly>
              <cc-search
                class="section-hero"
                style="text-align:left;"
              />
            </ClientOnly>
            <div
              class="section-hero"
              style="text-align:left;margin-bottom:60px;"
            >
              <h6>Doelgroep</h6>
              <div style="display:flex;flex-direction:row;justify-content:start;width:100%">
                <button
                  v-for="(a, key) in audience"
                  :key="a.name"
                  v-on:click="toggleStatus('audience', key, audience, totalAudienceActive)"
                  v-bind:class="{'cc-button--inActive': setAudienceInactive(a.active) }"
                  class="tagline cc-button"
                  style="margin-right:10px;font-weight:400;margin-bottom:0"
                >
                  {{ a.name }}
                </button>
              </div>
              <h6>Genre</h6>
              <div
                v-if="genres"
                style="display:flex;flex-direction:row;justify-content:start;width:100%;flex-wrap:wrap"
              >
                <button
                  v-bind:disabled="genre.total === 0"
                  v-on:click="toggleStatus('genres', key, genres, totalGenresActive)"
                  class="tagline cc-button"
                  v-for="(genre, key) in genres"
                  :key="key"
                  :class="{'cc-button--inActive': setGenreInactive(genre.active, genre.total)  }"
                  style="margin-right:10px;margin-bottom:10px;font-weight:400"
                >
                  {{ genre.name }} ({{ genre.total }})
                </button>
              </div>
              <button
                class="text-small"
                v-if="filtersActive"
                @click="toggleAll(true)"
                style="margin-bottom:24px;background: none;text-decoration: underline;"
              >Filters wissen</button>
            </div>
            <div
              class="cc-vue"
              style="margin-top:24px;"
            >
              <div class="w-dyn-items w-row">
                <div
                  class="w-dyn-item w-dyn-item w-col w-col-4"
                  v-for="(item, id) in filteredItems"
                  :key="id"
                >
                  <g-link
                    :to="item.path"
                    class="video-card w-inline-block"
                  >
                    <!-- <a
                    v-on:click="goToPage(item.url)"
                    class="video-card w-inline-block"
                  > -->
                    <div
                      class="cc-video-card-image-wrapper"
                      style="position:relative"
                    >
                    <!-- {{ item.image }} -->
                      <g-image
                        v-if="item.image"
                        :src="item.image"
                        width="400"
                        height="300"
                        fit="cover"
                        style="position:absolute;height: 100%;width: 100%;object-fit: cover;"
                      />
                      <!-- TODO: add placeholder image -->
                      <div
                        v-else
                        style="position:absolute;height: 100%;width: 100%;object-fit: cover;"
                      ></div>

                      <div
                        class="video-card-image-inner"
                        style="position:relative"
                      >
                        <div class="tagline">{{ item.genre }}</div>
                        <div
                          class="cc-videocard__age"
                          v-if="item.age !== 'undefined' && item.age !== ''"
                        >{{ item.age }}</div>
                      </div>

                    </div>
                    <div class="video-card-content">
                      <div class="cc-videocard__genre">{{ item.genre }}</div>
                      <h3 class="heading-4">{{ item.title }}</h3>
                      <div
                        class="cc-videocard__company"
                        v-if="item.company !== 'undefined' && item.company !== ''"
                      >{{ item.company }}</div>
                      <div
                        class="cc-videocard__company"
                        v-if="item.recordedAt !== 'undefined' && item.recordedAt !== ''"
                      >{{ item.recordedAt }}</div>
                      <div class="cc-videocard__spacer"></div>
                      <div
                        class="cc-videocard__duration"
                        v-if="item.videoLength !== 'undefined' && item.videoLength !== ''"
                      >{{ item.videoLength }}</div>
                      <div class="card-play-button-small">
                        <img
                          src="@/assets/images/play.svg"
                          alt=""
                          class="icon-small"
                        >
                      </div>
                    </div>
                    <!-- </a> -->
                  </g-link>
                </div>
              </div>
              <div
                v-if="paginationNeeded"
                style="display:flex;flex-direction:row;justify-content:center;width:100%;align-items:center;"
              >
                <button
                  v-bind:disabled="!startItem"
                  v-on:click="changePage('previous')"
                  v-bind:class="{'cc-button--inActive': !startItem }"
                  class="button"
                  style="margin-right:5px"
                >
                  Vorige
                </button>
                <span style="margin-left:24px;margin-right:24px;">Pagina {{ activePage }} van {{ totalPages }}</span>
                <button
                  v-bind:disabled="disableIfLastPage"
                  v-on:click="changePage('next')"
                  v-bind:class="{'cc-button--inActive': disableIfLastPage }"
                  class="button"
                  style="margin-left:5px"
                >
                  Volgende
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  video: allEntries(sortBy:"publishDate") {
    edges {
      node {
        path,
        publishDate,
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

// const ccSearch = () =>
//   import(
//     /* webpackChunkName: "search" */ "@/components/cc-search"
//   ).catch(error => console.warn(error));
import ccSearch from "~/components/cc-search.vue";
import ccLoader from "~/components/cc-loader.vue";
export default {
  components: {
    ccSearch,
    ccLoader
  },
  mounted() {
    const allItemsSimplified = this.$static.video.edges.map(val => {
        return val.node;
    });

    // Filter out undefined genres
    this.allItems = allItemsSimplified.filter(val => val.genre !== "")


    const genres = this.allItems.reduce(this.setGenres, {});
    /* Convert object to array */

    const genresArray = Object.keys(genres).map(function(key) {
      return { name: key, active: true, total: genres[key].total };
    });

    this.genresDefaultObject = genres;
    this.genres = [...genresArray];

    this.filterItems();
  },
  methods: {
    setGenres: function(acc, item) {
      const genre = item.genre;
      let total = 0;
      if (acc[genre]) {
        total = acc[genre].total;
      }
      const setGenre = { total: total + 1 };
      return { ...acc, [genre]: setGenre };
    },
    toggleAll: function(val) {
      const allGenresToActive = this.genres.map(i => {
        const activeItem = { ...i, active: true };
        return activeItem;
      });
      this.genres = allGenresToActive;
      const allAudienceToActive = this.audience.map(i => {
        const activeItem = { ...i, active: true };
        return activeItem;
      });
      this.audience = allAudienceToActive;

      this.untouchedAudience = true;
      this.untouchedGenres = true;
      this.filterItems();
    },
    toggleStatus: function(type, key, originalArray, allActive) {
      let action = 'off';
      if(originalArray[key].active === true) action = 'on';

      this.$gtm.trackEvent({
        event: 'filter',
        filterName: originalArray[key].name,
        filterStatus: action,
      });
      /* Back to first page */
      this.startItem = 0;

      const array = [...originalArray];
      const item = { ...array[key] };
      let updatedArray = [];

      let updatedItem = {};
      if (type === "genres") {
        if (this.untouchedGenres === true && originalArray[key].active) {
          updatedArray = array.map((i, k) => {
            if (k === key) {
              return { ...i, active: i.active };
            } else {
              return { ...i, active: !i.active };
            }
          });

          updatedItem = { ...array[key], active: updatedArray[key].active };
        } else {
          updatedArray = [...array];
          updatedItem = { ...array[key], active: !updatedArray[key].active };
        }
      }

      if (type === "audience") {
        if (this.untouchedAudience === true && originalArray[key].active) {
          updatedArray = array.map((i, k) => {
            if (k === key) {
              return { ...i, active: i.active };
            } else {
              return { ...i, active: !i.active };
            }
          });

          updatedItem = { ...array[key], active: updatedArray[key].active };
        } else {
          updatedArray = [...array];
          updatedItem = { ...array[key], active: !updatedArray[key].active };
        }
      }

      /* If it's the first time the user clicks, we can make the active buttons coloured */
      if (type === "audience" && this.untouchedAudience === true) {
        this.untouchedAudience = false;
      }

      if (type === "genres" && this.untouchedGenres === true) {
        this.untouchedGenres = false;
      }

      updatedArray[key] = updatedItem;

      for (var i = 0; i < updatedArray.length; i++) {
        this.$set(originalArray, i, updatedArray[i]);
      }

      //       let eventAction = "off";
      //       if (originalArray[key].active) eventAction = "on";

      //       gtag("event", eventAction, {
      //         event_category: originalArray[key].name,
      //         event_label: "Filter"
      //       });

      this.filterItems();
    },
    setAudienceInactive: function(status) {
      if (this.untouchedAudience) {
        return true;
      }
      if (status) {
        return false;
      } else {
        return true;
      }
    },
    setGenreInactive: function(status, total) {
      if (this.untouchedGenres) {
        return true;
      }
      if (total === 0) return true;
      return !status;
    },
    changePage: function(val) {
      if (val === "next") {
        this.startItem = this.startItem + this.itemsPerPage;
      }
      if (val === "previous") {
        this.startItem = this.startItem - this.itemsPerPage;
      }

      this.filterItems();

      setTimeout(() => {
        let elmnt = document.getElementById("videos");
        elmnt.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    filterItems: function() {
      // TODO: Turn into computed
      /* Items getting filtered*/
      // Get items => if an item does not contain a genre or audience, remove it.
      const items = this.allItems.filter(val  => {
        if(val.audience !== "" || val.genre !== "") return val;
      });
      

      

      
      // Start with an empty array.
      // First filter on audience (then on genre)
      let filteredItemsAudience = [];
      // totalAudienceActive is a computed value
      if (this.totalAudienceActive === 0) {
        // if there are no audiences activated (active = true), show all the item
        filteredItemsAudience = items;
      } else {
        // if there are audiences active, filter out the once that are active
        filteredItemsAudience = items.filter(item => {
          const audience = this.audience.find(
            element =>
              element.name.toLowerCase() === item.audience.toLowerCase()
          );
          if (audience) {
            if (audience.active) return item;
          }
        });
      }
    
      // Now filter this list based on active genres
      // Start with an empty array that will be filtered on genre
      let filteredItemsGenre = [];

      // Lets get the genre from data in a constant to use here (so we don't accidentally change the genre array in the state)
      const genresArray = this.genres;
      if (this.totalGenresActive === 0) {
        // If all genres are active, just return all items (filtered by  audience)
        filteredItemsGenre = filteredItemsAudience;
      } else {
        // filter items based ongenres
        filteredItemsGenre = filteredItemsAudience.filter(item => {
          const genre = genresArray.find(
            element => element.name.toLowerCase() === item.genre.toLowerCase()
          );
          if (genre) {
            if (genre.active) return item;
          }
        });
      }

      // Count genres per item
      const recountedGenres = filteredItemsAudience.reduce(this.setGenres, {});

      // What is this again
      const genresToZero = this.genresDefaultObject;
      for (let key in genresToZero) {
        if (genresToZero.hasOwnProperty(key)) {
          genresToZero[key].total = 0;
        }
      }

      // the recounted genres don't have the non active genres, so add this again
      const combinedGenres = {
        ...genresToZero,
        ...recountedGenres
      };

      // Turn combinedGenres object into an array
      const recountedGenresArray = Object.keys(combinedGenres).map(key => {
        return { ...combinedGenres[key], name: key };
      });

      // Add the status of each genre
      const genresArrayCombined = recountedGenresArray.map((item, key) => {
        if (this.genres[key] === undefined) return { ...item, active: false };
        return { ...item, active: this.genres[key].active };
      });
  
      // Pagination
      const filteredItems = filteredItemsGenre.slice(
        this.startItem,
        this.endItem
      );

      // Update state
      this.genres = genresArrayCombined;
      this.totalFilteredItems = filteredItemsGenre.length;
      this.filteredItems = filteredItems;
    }
  },
  watch: {
    '$route' (to, from) {
      /**
      * Watching what route we are going to. If "home", rest filters
      */
      if(to.fullPath === '/') {
        this.toggleAll(true)
      }
    }
  },
  computed: {
    totalGenresActive() {
      const values = this.genres.filter(function(item) {
        return item.active;
      });
      return values.length;
    },
    totalAudienceActive() {
      const values = this.audience.filter(function(item) {
        return item.active;
      });
      return values.length;
    },

    paginationNeeded() {
      return this.totalFilteredItems >= this.endItem - this.itemsPerPage
        ? true
        : false;
    },
    totalPages() {
      return Math.ceil(this.totalFilteredItems / this.itemsPerPage);
    },
    activePage() {
      if (this.startItem === 0) return 1;

      return this.startItem / this.itemsPerPage + 1;
    },
    disableIfLastPage() {
      return this.startItem + this.itemsPerPage >= this.totalFilteredItems
        ? true
        : false;
    },
    filtersActive() {
      const genresActive = this.totalGenresActive > 0;
      const audienceActive = this.totalAudiencesActive > 0;

      return (
        (genresActive || audienceActive) &&
        (!this.untouchedGenres || !this.untouchedAudience)
      );
    },
    endItem() {
      return this.startItem + this.itemsPerPage;
    }
  },
  data() {
    return {
      genres: [],
      audience: [
        {
          name: "Volwassenen",
          order: 0,
          active: true
        },
        {
          name: "Familie",
          order: 1,
          active: true
        }
      ],
      allItems: [],
      items: [],
      filteredItems: [],
      itemsPerPage: 15,
      startItem: 0,
      genresDefaultObject: {},
      totalFilteredItems: 0,
      untouchedAudience: true,
      untouchedGenres: true
    };
  }
};
</script>

<style >
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
  -o-object-fit: cover;
  object-fit: cover;
}

</style>