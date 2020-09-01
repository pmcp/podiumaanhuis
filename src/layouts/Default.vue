<template>
  <div>
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      data-w-id="353cc318-c335-213c-2409-5d90f1584c3e"
      class="header w-nav"
    >
      <div class="header-container">
        <g-link
          to="/"
          aria-current="home"
          class="link-block w-inline-block w--current"
        >
          <div class="nav-link cc-homelink">Podium Aan Huis</div>
        </g-link>
        <nav
          role="navigation"
          class="nav-menu w-nav-menu"
          :class="{ 'cc-nav--open': navOpen }"
        >
          <g-link
            to="/"
            aria-current="home"
            class="nav-link w--current"
          >Home</g-link>
          <!-- <g-link
            to="/#videos"
            class="nav-link"
          >Video's</g-link> -->
          <g-link
            to="/pages-over-dit-initiatief"
            class="nav-link"
          >Over</g-link>
        </nav>
          <button
            @click="navOpen = !navOpen"
            class="menu-toggle"
            :class="{ 'opened': navOpen }"
            id="menu-toggle"
            style="position:absolute;z-index:10;right:10px;top:0;"
            aria-expanded="false"
          ><span class="screen-reader-text">Menu</span>
            <svg
              class="icon icon-menu-toggle"
              aria-hidden="true"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
            >
              <g class="svg-menu-toggle">
                <path
                  class="line line-1"
                  d="M5 13h90v14H5z"
                />
                <path
                  class="line line-2"
                  d="M5 43h90v14H5z"
                />
                <path
                  class="line line-3"
                  d="M5 73h90v14H5z"
                />
              </g>
            </svg>
          </button>
        
      </div>
    </div>
    <div class="">
      <transition
        name="fade"
        appear
      >
        <main>
          <slot />
        </main>
      </transition>
    </div>

      <!-- <div class="section-3">
        <div class="container">
          <div class="w-row">
            <div class="w-col w-col-6">
              <div class="w-richtext">
                <p>
                  <g-link to="/pages-gebruiksvoorwaarden">Gebruiksvoorwaarden / Privacyverklaring</g-link>
                </p>
              </div>
            </div>
            <div class="w-col w-col-6">
              <div class="text-block-3">Deze website is mogelijk gemaakt door</div>
              <div class="columns-2 w-row">
                <div class="column-3 w-col w-col-6 w-col-medium-6 w-col-small-6 w-col-tiny-tiny-stack"><a
                    href="https://www.cultuurconnect.be/"
                    target="_blank"
                    class="w-inline-block"
                  >
                    <g-image
                      src="~/assets/images/logocc.png"
                      width="400"
                    /></a></div>
                <div class="column-4 w-col w-col-4 w-col-medium- w-col-small-4 w-col-tiny-tiny-stack">
                  <g-image
                    src="~/assets/images/logovlaanderen.png"
                    width="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
  </div>
</template>

<static-query>
query {
  pages:allMdPages {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      navOpen: false
    };
  }
};
</script>
<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}

/* Mobile Nav */
 .menu-toggle {
    display: none;
  }
@media screen and (max-width: 991px) {
  .header-container {
    flex-direction: column;
    align-items: start;
  }
  .menu-toggle {
    display: block;
  }
}

.cc-nav--open {
  display: block !important;
}


/* Everything hamburger icon */
button,
input[type="button"] {
	border: none;
	border-radius: 0;
	background: transparent;
	color: #000;
  cursor: pointer;
	display: inline-block;
	padding: 1em 1.5em;
	text-transform: uppercase;
	transition: all 0.25s ease-in-out;
}

.menu-toggle {
  font-size: 0.875em;
	padding: 1em;
}
.menu-toggle:focus {
	outline: thin dotted;
  outline-offset: -2px;
}

.icon {
	display: inline-block;
	fill: currentColor;
	height: 1em;
	width: 1em;
	vertical-align: middle;
	position: relative; /* Align more nicely with capital letters */
	top: -0.0625em;
}

/* Menu toggle styles. */

.icon-menu-toggle {
	width: 1.4em;
	height: 1.4em;
  top: 0;
}

/* Animate menu icon (lines). */
.svg-menu-toggle .line {
  opacity: 1;
  transform: rotate(0) translateY(0) translateX(0);
  transform-origin: 1em 1em;
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
}
.svg-menu-toggle .line-1 {
  transform-origin: 1em 2.5em;
}
.svg-menu-toggle .line-3 {
  transform-origin: 1em 4.5em;
}

.menu-toggle.opened .svg-menu-toggle .line-1 {
  transform: rotate(45deg) translateY(0) translateX(0);
}
.menu-toggle.opened .svg-menu-toggle .line-2 {
  opacity: 0;
}
.menu-toggle.opened .svg-menu-toggle .line-3 {
  transform: rotate(-45deg) translateY(0em) translateX(0em);
}

/* Text meant only for screen readers. */
.screen-reader-text {
	clip: rect(1px, 1px, 1px, 1px);
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
}
</style>