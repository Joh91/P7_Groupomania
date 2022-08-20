<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/page1">Page1</router-link>
      <router-link to="/page2">Page2</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>




export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>

</style>
