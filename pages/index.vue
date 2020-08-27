<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Hello Dapps
      </h1>
      <div class="links">
        <!-- <a @click="$router.push('./demo.vue')">Demoへ</a> -->
        <nuxt-link to="/demo">Demoへ</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}


</style>
