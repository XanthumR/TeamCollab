<template>
    <v-sheet height="100vh" style="background: linear-gradient(135deg, white, black);">
    <v-row justify="center" align="center" class="fill-height pa-4">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="8" class="overflow-hidden">
          <!-- Header Banner -->
          <div class="profile-banner"></div>

          <!-- Avatar -->
          <div class="d-flex flex-column align-center mt-n12">
            <v-avatar size="120" class="elevated-avatar">
              <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
            </v-avatar>
            <h2 class="mt-3 mb-1 text-h5 font-weight-medium">John Doe</h2>
            <span class="text-subtitle-2 grey--text">john@mail.com</span>
          </div>

          <v-divider class="my-6"></v-divider>

          <!-- Profile Details -->
          <v-list lines="two" class="px-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>John Doe</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>john@mail.com
</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Phone</v-list-item-title>
                <v-list-item-subtitle>+1 234 567 890</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions class="pa-4">
            <v-btn color="primary" block rounded elevation="2">
              <v-icon start>mdi-pencil</v-icon>
              Edit Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    </v-sheet>

</template>

<script setup lang="ts">
// Add any necessary logic here
</script>

<style scoped>

.profile-banner {
  height: 140px;
  background: linear-gradient(135deg, black, white);
}

.elevated-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
</style>
