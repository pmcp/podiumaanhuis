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
      <a
        href="/"
        aria-current="page"
        class="link-block w-inline-block w--current"
      >
        <div class="nav-link cc-homelink">Podium Aan Huis</div>
      </a>
      <nav
        role="navigation"
        class="nav-menu w-nav-menu"
      ><a
          href="index.html"
          aria-current="page"
          class="nav-link w--current"
        >Home</a><a
          href="/#videos"
          class="nav-link"
        >Video&#x27;s</a><a
          href="http://www.podiumaanhuis.be/pages/over-dit-initiatief"
          class="nav-link"
        >Over</a></nav>
      <div class="menu-button w-nav-button">
        <div
          data-w-id="d960c8fd-b11b-8b8d-9c2d-522ba91f47ab"
          data-animation-type="lottie"
          data-src="https://uploads-ssl.webflow.com/5e74d1a991dea41c1dcdc1e7/5e74d1a9ef2235d0b6c7d68d_lottieflow-menu-nav-11-2-130a2c-easey.json"
          data-loop="0"
          data-direction="1"
          data-autoplay="0"
          data-is-ix2-target="1"
          data-renderer="svg"
          data-default-duration="4.5"
          data-duration="0"
          class="menu-icon"
        ></div>
      </div>
    </div>
    </div>
    <div class="cc-pagewrapper">
      <slot/>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>



