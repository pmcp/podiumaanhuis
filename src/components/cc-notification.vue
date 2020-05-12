<template>
  <div v-html="inner" class="cc-notification">
    
  </div>
</template>

<script>
export default {
props: {
  inner: {
    type: String,
    default: ''
  }
  },
}
</script>

<style>

</style>
<style>
.cc-notification {
  padding: 10px 10px;
  border-radius: 10px;
  background-color: #fc2d75;
  text-align: left;
}
.cc-notification > p, .cc-notification a {
  color: #fff;
  margin-bottom: 0;
}

.cc-notification > a:hover {
  color: #fff;
}
</style>