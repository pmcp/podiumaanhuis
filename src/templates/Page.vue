<template>
  <div class="cc-pagewrapper">
    <div class="section-4">
      <div class="container-2 w-container">
        <h1 class="heading-7">{{ $page.page.title }}</h1>
        <p></p>
        <div
          class="w-richtext"
          v-html="$page.page.content"
        ></div>
      </div>
    </div>
  </div>
</template>

<page-query>
query ($id: ID!) {
  page: mdPages(id: $id) {
    title
    content
  }
}
</page-query>


<script>
export default {
  props: {
    form: {
      type: Boolean,
      default: false
    }
  },
  metaInfo() {
    return {
      title: this.$page.page.title
    };
  },
};
</script>