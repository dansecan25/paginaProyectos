<script setup lang="ts">
import LinkedinIcon from '../assets/icons/linkedin-svgrepo.svg';
import GithubIcon from '../assets/icons/github-142-svgrepo.svg';
import InstagramIcon from '../assets/icons/instagram-svgrepo.svg';
</script>

<template>
  <footer class="main-footer">
    <div class="footer-content-wrapper">
      
      <!-- Grouping copyright and new design text together -->
      <div class="footer-info">
        
        <!-- The explicit copyright line has been removed to avoid conflict with asset licenses -->
        
        <!-- Added new design text line as requested -->
        <p class="design-text">Designed in Figma • Coded with Vue</p>
      </div>

      <div class="links-section">
        <p class="links-header">Other links</p>
        <div class="icons-row">
          
          <!-- GitHub Icon (Order 1) -->
          <a href="https://github.com/dansecan25" target="_blank" class="icon-link" aria-label="Visit GitHub Profile">
            <GithubIcon class="social-icon-styles"/>
          </a>
          <a href="https://www.linkedin.com/in/dansecan" target="_blank" class="icon-link" aria-label="Visit LinkedIn Profile">
            <LinkedinIcon class="social-icon-styles"/>
          </a>
          <a href="https://www.instagram.com/dansecan25" target="_blank" class="icon-link" aria-label="Visit Instagram Profile">
            <InstagramIcon class="social-icon-styles"/>
          </a>
          
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Base Footer Styles */
.main-footer {
  background-color: #070707; /* New darker background */
  color: #c0c0c0;
  /* Centralized padding based on user intent */
  padding: 26px 40px 50px; 
  border-top: 1px solid #333;
  margin-top: auto; /* Push footer to the bottom of the page */
}

.footer-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* New block to group copyright and design text */
.footer-info {
    display: flex;
    flex-direction: column;
    gap: 5px; /* Small space between the two text lines */
    align-items: flex-start;
}

/* Style for the new design text line (using 'text-sm' size) */
.design-text {
    font-size: 0.8rem; 
    margin: 0;
    color: #888;
}

.links-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.links-header {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #ffffff;
}

/* Icons Row Styles */
.icons-row {
  display: flex;
  /* Enforces minimum 24px spacing between icons */
  gap: 24px; 
  align-items: center;
}

.icon-link {
    display: block;
    transition: transform 0.2s ease;
    line-height: 1; /* Fixes vertical alignment */
}

.icon-link:hover {
    transform: translateY(-3px); /* Lift effect on hover */
}

/* SVG Icon Styling */
.social-icon-styles {
  width: 24px;
  height: 24px;
  fill: #c0c0c0; /* Default icon color */
  transition: fill 0.2s ease;
}

/* Optional: Different hover color for the icons */
.icon-link:nth-child(1):hover .social-icon-styles { fill: #ffffff; } /* GitHub */
.icon-link:nth-child(2):hover .social-icon-styles { fill: #0077b5; } /* LinkedIn Blue */
.icon-link:nth-child(3):hover .social-icon-styles { fill: #e1306c; } /* Instagram Pink */


/* Mobile Responsiveness (Preserved and updated for new structure) */
@media (max-width: 768px) {
  .footer-content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem; /* Add gap between sections on mobile */
  }
  
  .footer-info {
      align-items: center; /* Center text lines on mobile */
      order: 2; /* Move text block below links on mobile */
      margin-top: 1rem;
  }

  .links-section {
      align-items: center;
      order: 1;
      margin-top: 1rem; /* Adjust margin */
  }
}
</style>