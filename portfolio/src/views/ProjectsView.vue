<template>
  <section>
    <h2 >PROJECTS</h2>
    <p>
      Some individual open source projects I have developed to showcase my knowledge in different technologies and areas.
    </p>

    <div>
      <ProjectCard framework="Flutter" title="Music Player" language="Dart" badgeColor="bg-blue-500" />
      <ProjectCard framework="Vue" title="Portfolio Webpage" language="Typescript" badgeColor="bg-green-600" />
      <ProjectCard framework="React Native" title="Personal Trainer" language="Javascript" badgeColor="bg-sky-400" />
      <ProjectCard framework="Tauri" title="Grocery History" language="Rust" badgeColor="bg-orange-500" />
      <ProjectCard framework="Qiskit" title="To do" language="Python" badgeColor="bg-purple-600" />
      <ProjectCard framework="Circuits" title="Door Password" language="Logic Gates" badgeColor="bg-lime-500" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import ProjectCard from "../components/ProjectCard.vue";
</script>
