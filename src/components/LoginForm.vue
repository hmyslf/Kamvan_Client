<template>
  <div class="col-4 mx-auto">
    <h3 class="text-center">Login</h3>
    <div class="text-danger" id="errorMessage" v-if="errorMessage">
      <span>{{ errorMessage }}</span>
    </div>
    <div class="text-success" id="successMessage" v-if="successMessage">
      <span>{{ successMessage }}</span>
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="mt-3">Or Login Using</p>
    <div id="google-login" class="g-signin2 mr-3"></div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  name: 'LoginForm',
  components: {
    GoogleLogin
  },
  props: ['errorMessage', 'successMessage'],
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      let userData = {
        email: this.email,
        password: this.password
      };
      this.$emit('login', userData);
    },
    onSignIn(googleUser) {
      this.$emit('onSignIn', googleUser);
    }
  },
  mounted() {
    gapi.signin2.render('google-login', {
      onsuccess: this.onSignIn,
      height: 25,
      width: 100
    });
  }
};
</script>

<style></style>
