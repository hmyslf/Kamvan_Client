<template>
  <div class="col-4 mx-auto">
    <h3 class="text-center">Register</h3>
    <form>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          aria-describedby="emailHelp"
          placeholder="First Name"
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
        />
      </div>
      <div class="form-group">
        <label for="emailLogin">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailLogin"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="passwordLogin">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordLogin"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {};
  }
};
</script>

<style></style>
