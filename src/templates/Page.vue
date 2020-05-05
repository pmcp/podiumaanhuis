<template>
  <Layout>
    <div class="cc-pagewrapper">
    <div class="section-4">
      <div class="container-2 w-container">
        <h1 class="heading-7">{{ $page.page.title }}</h1>
        <p></p>
        <div class="w-richtext" v-html="$page.page.content"></div>
      </div>
    </div>
  </div>
    
  </Layout>
  
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