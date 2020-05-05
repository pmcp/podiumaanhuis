<template>
  <div
    id="videos"
    class="section ccsection--videos"
  >

    <div class="container">
      <h2 class="section-header-border">Video&#x27;s</h2>
      <div >

        <div class="cc-video__vue">
          <div class="container">
            <div style="padding-left:10px;padding-right:10px;"
>
            <ClientOnly>
            
        <cc-search />
      </ClientOnly>
</div>
            <div
              class="filter__container"
              style="padding-left:10px;padding-right:10px;"
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
                  {{ genre.name }} ({{ genre.total }}) - {{ setGenreInactive(genre.active, genre.total) }}
                </button>
              </div>
              <button
                class="text-small"
                v-if="filtersActive"
                @click="toggleAll(true)"
                style="margin-bottom:24px;background: none;text-decoration: underline;"
              >Filters wissen</button>
            </div>

            <!-- 

                    <div class="cc-vue-video__filtercontainer">
                      <div class="cc-classforfilter">Volwassenen</div>
                      <div class="cc-classforgenre">Muziektheater</div>
                    </div><a href="/video/berg" class="video-card w-inline-block">
                      <div style="background-image:url(&quot;https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e7de5f8d3db3a22c3f71797_JonasDeVisscher.25_online.jpg&quot;)" class="video-card-image-wrapper">
                        <div class="video-card-image-inner">
                          <div class="tagline">muziektheater</div>
                          <div class="cc-videocard__age">16+</div>
                        </div>
                      </div>
                      <div class="video-card-content">
                        <div class="cc-videocard__genre">muziektheater</div>
                        <h3 class="heading-4">Berg</h3>
                        <div class="cc-videocard__company">Raumteid</div>
                        <div class="cc-videocard__company">Opname in Minardschouwburg, Gent</div>
                        <div class="cc-videocard__spacer"></div>
                        <div class="cc-videocard__duration">87 min</div>
                        <div class="card-play-button-small"><img src="https://uploads-ssl.webflow.com/5e74d1a991dea41c1dcdc1e7/5e74d1a9ef2235655fc7d652_play-icon.svg" alt="" class="icon-small" /></div>
                      </div>
                    </a> -->

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
                    :to="`voorstellingen/${ item.slug }`"
                    class="video-card w-inline-block"
                  >
                    <!-- <a
                    v-on:click="goToPage(item.url)"
                    class="video-card w-inline-block"
                  > -->
                    <div
                      class="video-card-image-wrapper"
                      :style="{ backgroundImage: `url('${item.thumbnail}')`}"
                    >
                      <div class="video-card-image-inner">
                        <div class="tagline">{{ item.genre }}</div>
                        <div class="cc-videocard__age">{{ item.age }}</div>
                      </div>
                    </div>
                    <div class="video-card-content">
                      <div class="cc-videocard__genre">{{ item.genre }}</div>
                      <h3 class="heading-4">{{ item.title }}</h3>
                      <div class="cc-videocard__company">{{ item.company }}</div>
                      <div class="cc-videocard__company">{{ item.recordedAt }}</div>
                      <div class="cc-videocard__spacer"></div>
                      <div class="cc-videocard__duration">{{ item.video.length }}</div>
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
  video: allVideo {
    edges {
      node {
        slug,
        id
        title,
        descr,
        age
        video {
          url,
          provider,
          length
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
  }
}
</static-query>

<script>
const ccSearch = () =>
  import(
    /* webpackChunkName: "search" */ "@/components/cc-search"
  ).catch(error => console.warn(error));

export default {
  components: {
    ccSearch
  },
  mounted() {
    const items = this.$static.video.edges.map(val => {
      return val.node;
    });

    const genres = items.reduce(this.setGenres, {});
    /* Convert object to array */

    const genresArray = Object.keys(genres).map(function(key) {
      return { name: key, active: true, total: genres[key].total };
    });

    this.genresDefaultObject = this.genres;
    this.genres = [...genresArray];

    this.items = items;

    this.filterItems(items);
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
      this.filterItems(this.items);
    },
    toggleStatus: function(type, key, originalArray, allActive) {
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

      this.filterItems(this.items);
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

      this.filterItems(this.items);

      setTimeout(() => {
        let elmnt = document.getElementById("videos");
        elmnt.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    filterItems: function(items) {
      /* Items getting filtered*/
      /* 1) if the audience is active, return the item */

      let filteredItemsAudience = [];
      if (this.totalAudienceActive === 0) {
        filteredItemsAudience = items;
      } else {
        filteredItemsAudience = items.filter(item => {
          const audience = this.audience.find(
            element => element.name === item.audience
          );
          if (audience) {
            if (audience.active) return item;
          }
        });
      }

      let filteredItemsGenre = [];

      const genresArray = this.genres;

      if (this.totalGenresActive === 0) {
        filteredItemsGenre = this.items;
      } else {
        filteredItemsGenre = filteredItemsAudience.filter(item => {
          const genre = genresArray.find(
            element => element.name === item.genre
          );
          if (genre) {
            if (genre.active) return item;
          }
        });
      }

      const recountedGenres = filteredItemsAudience.reduce(this.setGenres, {});

      // Not functional
      const genresToZero = this.genresDefaultObject;
      for (let key in genresToZero) {
        if (genresToZero.hasOwnProperty(key)) {
          genresToZero[key].total = 0;
        }
      }

      const combinedGenres = {
        ...this.genresDefaultObject,
        ...recountedGenres
      };
      const recountedGenresArray = Object.keys(combinedGenres).map(key => {
        return { ...combinedGenres[key], name: key };
      });

      const genresArrayCombined = recountedGenresArray.map((item, key) => {
        return { ...item, active: this.genres[key].active };
      });

      this.genres = genresArrayCombined;
      this.totalFilteredItems = filteredItemsGenre.length;
      const filteredItems = filteredItemsGenre.slice(
        this.startItem,
        this.endItem
      );

      this.filteredItems = filteredItems;
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