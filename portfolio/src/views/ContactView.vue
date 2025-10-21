<script setup lang="ts">
import { ref } from 'vue';

// Reactive state for form inputs
const subject = ref('');
const body = ref('');
const isSubmitted = ref(false);

// 💡 IMPORTANT: Replace this placeholder with your actual email address!
const portfolioOwnerEmail = 'dsecanas254@gmail.com'; 

const sendEmail = () => {
  // We only check for Subject and Body now, since senderEmail field is removed
  if (!subject.value || !body.value) {
    // Basic validation check
    return;
  }

  // 1. Compile the full message body (removed the "Sender Email" line)
  const fullBody = `Message:\n${body.value}`;

  // 2. URL encode the subject and body to handle spaces and special characters
  const encodedSubject = encodeURIComponent(subject.value);
  const encodedBody = encodeURIComponent(fullBody);

  // 3. Construct the mailto link
  const mailtoLink = `mailto:${portfolioOwnerEmail}?subject=${encodedSubject}&body=${encodedBody}`;

  // 4. Open the mail client (This triggers the download or client launch)
  window.location.href = mailtoLink;

  // Show a submission message and clear fields (assuming the mail client opened)
  isSubmitted.value = true;
  setTimeout(() => {
    isSubmitted.value = false;
    subject.value = '';
    body.value = '';
  }, 3000);
};
</script>

<template>
  <div class="contact-container">
    <h1 class="page-title">Contact Me</h1>
    <p class="description">
      Have a project or question? Fill out the form below. When you click send, it will automatically open your default email client with the details pre-filled.
    </p>

    <!-- Success Message Box -->
    <div v-if="isSubmitted" class="success-message">
        Email client launched successfully! Look for a new draft email.
    </div>

    <form @submit.prevent="sendEmail" class="contact-form">
      
      <!-- Removed the "Your Email Address" form group -->

      <div class="form-group">
        <label for="subject">Subject</label>
        <input 
          id="subject" 
          type="text" 
          v-model="subject" 
          placeholder="I'd like to discuss a project..." 
          required 
        />
      </div>

      <div class="form-group">
        <label for="body">Message Body</label>
        <textarea 
          id="body" 
          v-model="body" 
          rows="8" 
          placeholder="Your detailed message here..." 
          required
        ></textarea>
      </div>
      
      <!-- Updated button class for new colors -->
      <button type="submit" class="send-button">Send Email</button>
    </form>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  color: #c0c0c0;
}

.page-title {
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #888;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
}

input[type="email"],
input[type="text"],
textarea {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: #0077b5; /* Highlight color */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 119, 181, 0.5);
}

textarea {
  resize: vertical;
}

/* Updated Button Styles: White background, black text */
.send-button {
  padding: 12px 20px;
  background-color: #ffffff; /* White background */
  color: #000000; /* Black text */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.2s;
  align-self: flex-start;
}

.send-button:hover {
  background-color: #e0e0e0; /* Light gray on hover */
  transform: translateY(-1px);
}

.success-message {
    padding: 15px;
    background-color: #28a745; 
    color: white;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
}

@media (max-width: 600px) {
  .contact-container {
    margin: 20px 10px;
  }
}
</style>