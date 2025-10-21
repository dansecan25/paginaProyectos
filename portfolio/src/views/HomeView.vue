<script setup lang="ts">
import MobilePhoneIcon from '../assets/icons/mobile-svgrepo.svg';
import BrowserIcon from '../assets/icons/browser-svgrepo.svg';
import MainframeIcon from '../assets/icons/mainframe-svgrepo.svg';
import { useRouter } from 'vue-router';

  // Initialize the router instance
  const router = useRouter();

  // 2. Define the navigation function
  const navigateToContact = () => {
    router.push('/contact');
  };
</script>

<template>
  <!-- Responsive container added for overall padding -->
  <div class="main-content-wrapper">
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
      <button class="contact-button" @click="navigateToContact">Contact</button>
    </section>

    <section>
      <h2 class="abilities">
        I’m capable of building websites, mobile apps for Android and iOS, mainframe batch jobs, and more!
      </h2>
      <p class="skills-paragraph">
        I offer fast learning skills for new technologies, development in most environments, understanding of frameworks such as Flutter, React, Angular, Vue, React Native, and more to come!
      </p>

      <div class="skills-show-boxes">
        <div class="skills-box">
          <BrowserIcon class="icon-styles"/>
          <div>
            <h3>Web pages</h3>
            <p>I develop web pages in frameworks like React, Vue and Angular.</p>
          </div>
        </div>
        <div class="skills-box">
          <MobilePhoneIcon class="icon-styles"/>
          <div>
            <h3>Mobile applications</h3>
            <p >I have developed mobile apps with Flutter, React Native and learning Tauri.</p>
          </div>
        </div>
        <div class="skills-box">
          <MainframeIcon class="icon-styles"/>
          <div>
            <h3 >Mainframe</h3>
            <p >I have used TSO commands on z/OS ISPF, as well as coded in assembler and COBOL.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Added wrapper for fluid content sizing */
.main-content-wrapper {
  max-width: 1200px;
  margin: 0 0 auto;
  padding: 0 1rem; /* Padding for mobile safety */
}

/* Estilos específicos para HomeView.vue */
.title-container {
  display: flex;
  padding: 4px 20px;
  margin: 84px 10px 44px 0px;
  width: fit-content;
  border-radius: 4px;
  background-color: #423f43;
  color: #ffffff; /* Ensure contrast */
}

.main-header {
  margin: 0px 0px 13px 0px;
  font-size: 2.5rem; /* Use rem for scalability */
}

.bio-description {
  width: 70%; /* Fixed for desktop */
  margin: 0px 0px 13px 0px;
  font-size: 1rem;
  line-height: 1.6;
}

.contact-button {
  background-color: #ffffff;
  color: #000000;
  margin: 73px 0px 245px 0px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-button:hover {
  background-color: #cccccc;
}

.abilities {
  margin: 0px 0px 74px 0px;
  font-size: 3rem; /* Adjusted for better scale */
  width: 85%;
  font-weight: normal;
  line-height: 1.2;
}

.skills-paragraph {
  margin: 0px 0px 98px 0px;
  width: 85%;
  font-size: 1.25rem;
}

.skills-show-boxes {
  display: flex;
  flex-direction: row;
  /* 💡 FIX 1: Allow items to wrap when space runs out */
  flex-wrap: wrap; 
  /* 💡 FIX 2: Use a fixed gap instead of large percentage for predictability */
  gap: 2rem; 
  margin-bottom: 231px;
  padding: 0px;
}

.skills-box {
  display: flex;
  flex-direction: row;
  /* 💡 FIX 3: Use calc() to ensure 3 boxes fit with gaps */
  flex: 0 0 calc(33.33% - 2rem); 
  align-items: flex-start;
  min-width: 250px; /* Prevent collapse on slightly smaller screens */
}

.skills-box > div {
  margin-left: 1rem; /* Space between icon and text */
}

.icon-styles {
  /* 💡 FIX 4: Use a smaller, consistent size for the SVG */
  width: 2rem; 
  height: 4rem;
  min-width: 3rem; /* Ensure it never shrinks below this size */
  margin-top: 0.3rem; 
  fill: #ffffff;
}

/* ---------------------------------------------------- */
/* 💡 FIX 5: Media Query for Mobile Responsiveness */
/* Stacks the layout on screens smaller than 768px */
@media (max-width: 768px) {
  .title-container {
    margin-top: 40px;
  }
  
  .main-header {
    font-size: 2rem;
  }

  .bio-description,
  .skills-paragraph,
  .abilities {
    width: 100%; /* Use full width on mobile */
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .abilities {
    font-size: 2rem;
  }

  .contact-button {
    margin-bottom: 80px;
  }

  .skills-show-boxes {
    flex-direction: column; /* Force stack for clear presentation */
    gap: 1.5rem;
  }

  .skills-box {
    /* Set box to full width when stacking */
    flex: 0 0 100%; 
    min-width: auto;
  }
  
  .icon-styles {
    /* Slight size increase for touch targets on mobile */
    width: 10rem; 
    height: 10rem;
    min-width: 10rem;
  }
}
</style>