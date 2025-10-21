<template>
  <!-- 
    1. Binary Background Element: Changed from 'position: fixed' to 
    'position: absolute' so it scrolls with the document content.
  -->
  <div class="binary-background">
    <!-- Mask container for the gradient fade -->
    <div class="binary-mask">
      <!-- Using <pre> to preserve whitespace and line breaks for the column effect -->
      <pre class="binary-content">{{ binaryString }}</pre>
    </div>
  </div>

  <!-- 2. Main Content Layout: Ensures content flows correctly over the binary background -->
  <div class="app-layout">
    <!-- Navbar (Sticky at the top) -->
    <Navbar />
    
    <main class="view-content-wrapper">
      <!-- Vue Router injects the current view (Home, Projects, Contact, etc.) here -->
      <router-view></router-view>
    </main>
    
    <!-- Footer at the bottom -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from "./components/NavbarComponent.vue";
import Footer from "./components/FooterComponent.vue";

// The full binary string, broken into lines for better column formatting
const binaryString = ref(`
01101000 01100101 
01101100 01101100 
01101111 00100001 
00100000 01001001 
01100110 00100000 
01111001 01101111
01110101 00100000 
01100001 01110010 
01100101 00100000
01110010 01100101 
01100001 01100100 
01101001 01101110
01100111 00100000 
01110100 01101000 
01101001 01110011
00101100 00100000 
01110100 01101000 
01101001 01110011 
00100000 01101001 
01110011 00100000 
01000001 01010011 
01000011 01001001 
01001001 00100000 
01100010 01101001
01101110 01100001 
01110010 01111001 
00100001 00100001
01101000 01100101 
01101100 01101100 
01101111 00100001
00100000 01001001 
01100110 00100000 
01111001 01101111
01110101 00100000 
01100001 01110010 
01100101 00100000
01110010 01100101 
01100001 01100100 
01101001 01101110
01100111 00100000 
01110100 01101000 
01101001 01110011
00101100 00100000 
01110100 01101000 
01101001 01110011 
00100000 01101001 
01110011 00100000 
01000001 01010011 
01000011 01001001 
01001001 00100000 
01100010 01101001
01101110 01100001 
01110010 01111001 
00100001 00100001
01101000 01100101 
01101100 01101100 
01101111 00100001
00100000 01001001 
01100110 00100000 
01111001 01101111
01110101 00100000 
01100001 01110010 
01100101 00100000
01110010 01100101 
01100001 01100100 
01101001 01101110
01100111 00100000 
01110100 01101000 
01101001 01110011
00101100 00100000 
01110100 01101000 
01101001 01110011 
00100000 01101001 
01110011 00100000 
01000001 01010011 
01000011 01001001 
01001001 00100000 
01100010 01101001
01101110 01100001 
01110010 01111001 
00100001 00100001
`);
</script>

<style>
/* Global styles for the App wrapper */
#app {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* --- Binary Background Styling --- */

.binary-background {
  /* 💡 FIX: Changed from 'fixed' to 'absolute' so it scrolls with the document */
  position: absolute; 
  top: 0;
  right: 0;
  width: 40%; 
  /* 💡 CHANGE: Increased height to cover potentially long content */
  height: 100%; 
  min-height: 100vh; /* Ensures it covers the initial viewport */
  overflow: hidden;
  z-index: 1; 
  pointer-events: none;
  opacity: 0.6; 
}

.binary-mask {
  position: relative;
  width: 100%;
  height: 100%;
}

.binary-content {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 30px; 
  font-weight: bold;
  line-height: 2;
  letter-spacing: 12px;
  color: #33FF00; 
  
  /* Retained gradient logic, which fades the text near the bottom */
  background: linear-gradient(
    to bottom, 
    #33FF00 0%,
    #1F9900 18%,
    #000000 90%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 50px 0 0 0; 
  margin: 0;
}

/* --- Content Wrapper --- */
.app-layout {
  position: relative;
  z-index: 10; 
}

.view-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px; 
}
</style>
