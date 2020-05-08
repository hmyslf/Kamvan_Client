<template>
  <div class="col-4 mx-auto">
    <h3 class="text-center">Register</h3>
    <div class="text-danger" id="errorMessage" v-if="errorMessage">
      <span>{{ errorMessage }}</span>
    </div>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          aria-describedby="emailHelp"
          placeholder="First Name"
          v-model="first_name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          aria-describedby="emailHelp"
          placeholder="Last Name"
          v-model="last_name"
        />
      </div>
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
        <label for="passwordLogin">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  props: ['errorMessage'],
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      let userData = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      };
      this.$emit('register', userData);
    }
  }
};
</script>

<style></style>
