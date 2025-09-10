<template>
    <ThreeScene>
  </ThreeScene>
  
  <v-container fluid style=" position: absolute; top: 0; left: 0; width: 100%; height: 100%;" class=" justify-center align-center fill-height">
    <v-row>
      <v-col md="4" class="mx-auto">
        <v-card style="background-color: rgba(255,255,255,0.5); backdrop-filter: blur(10px);" class=" pa-6 rounded-lg login-card">
          <v-card-title class="text-h5 text-center mb-4">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" class="d-flex flex-column gap-4">
              <v-text-field
                v-model="form.email"
                :error-messages="v$.email.$errors.map(e => e.$message.toString())"
                label="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                required
                clearable
                persistent-clear
              />
              <v-text-field
                v-model="form.password"
                :error-messages="v$.password.$errors.map(e => e.$message.toString())"
                label="Password"
                style="padding-top: 3vh;"
                type="password"
                variant="outlined"
                density="comfortable"
                required
                clearable
                persistent-clear
              />
              <v-btn
                type="submit"
                color="white darken-4"
                size="large"
                block
                class="mt-4"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import LoginAPI from '../api/LoginAPI';
import { useAuthStore } from '../stores/AuthStore';
import router from '../router';
import ThreeScene from '../components/ThreeScene.vue';

interface LoginForm {
  email: string;
  password: string;
}

const form = ref<LoginForm>({
  email: '',
  password: ''
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(6)}
  }
})

const v$ = useVuelidate(rules, form)


const login = async () => {
  const result = await v$.value.$validate();
  if(result){
    LoginAPI.login(form.value.email, form.value.password)
    .then(response => {
      const authStore = useAuthStore();
      authStore.login(form.value.email, response.data.access_token);
      console.log(authStore.email);
      alert('Login successful!');
      router.push('/home');
    })
    .catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    });
  } else{
    alert('error, form not submitted')
  }
}
</script>

<style scoped>
.login-card {
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}
.fill-height {
  min-height: 100vh;
}
</style>
