<template>
  <v-container class="settings-page" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="6">
          <!-- Header -->
          <v-card-title class="text-h5 py-6">
            <v-icon class="mr-2" color="primary">mdi-cog</v-icon>
            Account Settings
          </v-card-title>
          <v-divider></v-divider>

          <!-- Tabs -->
          <v-tabs v-model="activeTab" bg-color="grey-lighten-4" fixed-tabs>
            <v-tab value="profile">Profile</v-tab>
            <v-tab value="security">Security</v-tab>
            <v-tab value="notifications">Notifications</v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <!-- Tab Content -->
          <v-window v-model="activeTab" class="pa-6">
            <!-- Profile Tab -->
            <v-window-item value="profile">
              <v-form @submit.prevent="saveProfile" ref="profileForm">
                <v-text-field
                  v-model="profile.name"
                  label="Full Name"
                  outlined
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="profile.email"
                  label="Email"
                  type="email"
                  outlined
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="profile.phone"
                  label="Phone"
                  outlined
                  class="mb-4"
                />
                <v-btn type="submit" color="primary" rounded>
                  <v-icon start>mdi-content-save</v-icon>
                  Save Changes
                </v-btn>
              </v-form>
            </v-window-item>

            <!-- Security Tab -->
            <v-window-item value="security">
              <v-form @submit.prevent="changePassword" ref="securityForm">
                <v-text-field
                  v-model="security.currentPassword"
                  label="Current Password"
                  type="password"
                  outlined
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="security.newPassword"
                  label="New Password"
                  type="password"
                  outlined
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="security.confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  outlined
                  class="mb-4"
                  required
                />
                <v-btn type="submit" color="primary" rounded>
                  <v-icon start>mdi-lock-reset</v-icon>
                  Update Password
                </v-btn>
              </v-form>
            </v-window-item>

            <!-- Notifications Tab -->
            <v-window-item value="notifications">
              <v-list lines="one" density="comfortable">
                <v-list-item>
                  <v-list-item-title>Email Notifications</v-list-item-title>
                  <v-list-item-action>
                    <v-switch v-model="notifications.email"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Push Notifications</v-list-item-title>
                  <v-list-item-action>
                    <v-switch v-model="notifications.push"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>SMS Notifications</v-list-item-title>
                  <v-list-item-action>
                    <v-switch v-model="notifications.sms"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-btn color="primary" rounded class="mt-4">
                <v-icon start>mdi-content-save</v-icon>
                Save Preferences
              </v-btn>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref('profile')

// Profile state
const profile = reactive({
  name: 'John Doe',
  email: 'john@mail.com',
  phone: '+1 234 567 890',
})

// Security state
const security = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Notification state
const notifications = reactive({
  email: true,
  push: false,
  sms: false,
})

// Form submission handlers
const saveProfile = () => {
  console.log('Profile saved', profile)
}
const changePassword = () => {
  console.log('Password changed', security)
}
</script>

<style scoped>
.settings-page {
  margin-top: 60px;
}
</style>
