<template>
  <router-view />
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const isUserLoggedIn = ref(false);
    const router = useRouter();

    // Watch for changes in login status and handle redirects
    watch(isUserLoggedIn, (newValue) => {
      if (newValue) {
        router.push('/frontPage');
      } else {
        router.push('/login');
      }
    });

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      isUserLoggedIn.value = false;
      router.push('/login'); // Ensure this redirects to the login page
    };

    return {
      isUserLoggedIn,
      logout,
      router,
    };
  },
};
</script>

<style>
body {
  background-color: black;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
