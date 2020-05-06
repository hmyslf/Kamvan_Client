<template>
  <div class="col-4 mx-auto">
    <h3 class="text-center">Login</h3>
    <div class="text-danger" id="errorMessage" v-if="errorMessage">
      <span>{{ errorMessage }}</span>
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
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: ['errorMessage'],
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
    }
  }
};
</script>

<style></style>
