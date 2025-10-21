<template>
  <section class="testing-class">
    <p class="title-container">Project portfolio</p>
    <h1 class="main-header">
      My name is Daniel,<br />
      Happy to learn and build always!
    </h1>
    <p class="bio-description">
      I'm a computer engineer who loves programming and learning new technologies.
      My main interests are in the fields of computer architecture and quantum computer architectures!<br />
      Skilled in adapting to new technologies fast and efficiently.
    </p>
    <button class="contact-button">Contact</button>
  </section>

  <section>
    <h2 class="abilities">
      I’m capable of building websites, mobile apps for Android and IOS, mainframe batch jobs, and more!
    </h2>
    <p >
      I'm offer fast learning skills for new technologies, development in most environments, understanding of frameworks such as Flutter, React, Angular, Vue, React Native, and more to come!
    </p>

    <div>
      <div>
        <h3 class="text-xl font-bold">Web pages</h3>
        <p class="text-gray-400">I develop web pages in frameworks like React, Vue and Angular.</p>
      </div>
      <div>
        <h3 class="text-xl font-bold">Mobile applications</h3>
        <p class="text-gray-400">I have developed mobile apps with Flutter, React Native and learning Tauri.</p>
      </div>
      <div>
        <h3 >Mainframe</h3>
        <p >I have used TSO commands on z/OS ISPF, as well as coded in assembler and COBOL.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* Estilos específicos para HomeView.vue */
  .title-container {
    display:flex;
   padding:4px 20px;
   margin: 84px 10px 44px 0px;
   width: fit-content;
   border-radius: 4px;
   background-color: #423F43;
  }  
  .main-header {
    margin:0px 0px 13px 0px;
  }
  .bio-description {
    width: 70%;
    margin:0px 0px 13px 0px;
    font-size:15;
    justify-content:baseline;
  }
  .contact-button {
    background-color: #ffffff;
    color: #000000;
    margin:73px 0px 245px 0px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .abilities {
    margin:0px 0px 74px 0px;
    font-size: 48px;
    width: 85%;
    font-weight: normal;
  }
  
</style>
