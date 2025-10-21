<template>
  <div class="flex-1">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import Navbar from "./components/NavbarComponent.vue";
  import Footer from "./components/FooterComponent.vue";
</script>
