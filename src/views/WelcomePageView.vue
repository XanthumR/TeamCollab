<template>
  <v-container class="welcome-container" fluid>
    <v-row justify="center" align="center" class="min-vh-100">
      <v-col cols="12" md="8" lg="6">
        <div class="text-center">
          <!-- Logo/Icon -->
          <div class="mb-8">
            <v-icon size="120" color="primary">mdi-account-group</v-icon>
          </div>
          
          <!-- Welcome Text -->
          <h1 class="text-h2 font-weight-bold mb-4 text-primary">
            Welcome to TeamCollab
          </h1>
          
          <p class="text-h5 mb-8 text-grey-darken-1">
            Collaborate, communicate, and achieve more together
          </p>
          
          <!-- Action Buttons -->
          <div class="d-flex flex-column flex-sm-row justify-center ga-4 mb-8">
            <v-btn
              color="primary"
              size="large"
              prepend-icon="mdi-rocket-launch"
              @click="getStarted"
              elevation="2"
            >
              Get Started
            </v-btn>
            
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              prepend-icon="mdi-information"
              @click="learnMore"
            >
              Learn More
            </v-btn>
          </div>
          
          <!-- Features -->
          <v-row class="mt-8" align="center" justify="center" dense>
            <v-col cols="12" sm="4">
              <div class="feature-item">
                <v-icon size="48" color="primary" class="mb-3">mdi-chat</v-icon>
                <h3 class="text-h6 mb-2">Real-time Chat</h3>
                <p class="text-body-2 text-grey-darken-1">
                  Instant messaging with your team members
                </p>
              </div>
            </v-col>
            
            <v-col cols="12" sm="4">
              <div class="feature-item">
                <v-icon size="48" color="primary" class="mb-3">mdi-clipboard-list</v-icon>
                <h3 class="text-h6 mb-2">Project Management</h3>
                <p class="text-body-2 text-grey-darken-1">
                  Organize tasks and track progress
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const getStarted = () => {
  // Navigate to dashboard or onboarding
  router.push('/dashboard')
  // Or show a getting started dialog
  console.log('Getting started...')
}

const learnMore = () => {
  // Navigate to about page or show more info
  router.push('/about')
  // Or show a learn more dialog
  console.log('Learning more...')
}
</script>

<style scoped>
.welcome-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.feature-item {
  text-align: center;
  padding: 24px 16px;
}

.min-vh-100 {
  min-height: 100vh;
}

/* Animation for welcome text */
.text-h2 {
  animation: fadeInUp 0.8s ease-out;
}

.text-h5 {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.v-btn {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.feature-item {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .text-h2 {
    font-size: 2.5rem !important;
  }
  
  .feature-item {
    padding: 16px 8px;
  }
}
</style>