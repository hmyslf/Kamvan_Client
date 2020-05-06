<template>
  <div class="col-4 mx-auto">
    <h3 class="text-center">Login</h3>
    <div class="text-danger" id="errorMessage" v-if="errorMessage">
      <span>{{ errorMessage }}</span>
    </div>
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="emailLogin">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailLogin"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="emailLogin"
        />
      </div>
      <div class="form-group">
        <label for="passwordLogin">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordLogin"
          placeholder="Password"
          v-model="passwordLogin"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  props: ['errorMessage'],
  data() {
    return {
      emailLogin: '',
      passwordLogin: ''
    };
  },
  methods: {
    login() {
      let userData = {
        emailLogin: this.emailLogin,
        passwordLogin: this.passwordLogin
      };
      this.$emit('login', userData);
    }
  }
};
</script>

<style></style>
