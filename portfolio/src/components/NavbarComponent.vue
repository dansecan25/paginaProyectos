<template>
  <nav class="navbar">
    <div class="profile-container">
      <a 
        href="https://github.com/dansecan25" 
        target="_blank" 
        class="profile-link-wrapper"
        aria-label="Visit Daniel's GitHub Profile"
      >
        <img class="profile-avatar" src="../assets/profile.jpg" alt="Daniel Profile Avatar" />
      </a>
    </div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/links">Links</router-link>
      <router-link to="/contact">Contact</router-link> 
    </div>
  </nav>
</template>

<script setup lang="ts">
// No script logic is needed here for this component's functionality
</script>

<style scoped>
/* --- Base Navbar Styles --- */
.navbar {
  display: flex;
  align-items: left;
  padding: 0 40px; 
  height: 55px;
  background-color: #1F1F1F; /* Kept color constant */
  color: #c0c0c0;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 1000;
}

/* --- Profile Styling --- */
.profile-container {
    margin-right: 25px; 
    display: flex;
}

.profile-link-wrapper {
  display: block; 
  width: 42px; 
  height: 42px;
  border-radius: 50%;
  overflow: hidden; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  line-height: 1;
}

.profile-link-wrapper:hover {
    transform: scale(1.05); 
    box-shadow: 0 0 10px #423F43; /* subtle glow */
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Navigation Links Styling --- */
.nav-links {
  display: flex;
  gap: 25px; /* Spacing between individual links */
  align-items: left;
}

.nav-links a {
  text-decoration: none;
  color: #c0c0c0; /* Default (inactive) text color */
  font-weight: 500;
  padding: 5px 0;
  border-bottom: 2px solid transparent; 
  transition: color 0.3s ease; /* Only transition the text color */
}

.nav-links a:hover {
  color: #ffffff; /* White text on hover */
}

/* Vue Router Active Link Styling */
.nav-links .router-link-active {
  color: #ffffff; /* White text for active route */
}

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
  .navbar {
    flex-direction: row;
    height: auto;
    padding: 15px 20px;
    gap:15px; /* Spacing between profile and links section */
  }

  .profile-container {
    margin-right: 0;
  }
  
  .profile-link-wrapper {
    width: 40px;
    height: 40px;
  }

  .nav-links {
    justify-content: left;
    width: 100%;
    gap: 15px; /* Reduce link spacing for smaller screens */
  }
  
  .nav-links a {
    font-size: 0.9rem;
  }
}
</style>