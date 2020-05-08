<template>
  <div id="navbar">
    <div class="d-flex p-3">
      <div class="title">
        <h2>KamVan Board</h2>
      </div>
      <div class="d-flex ml-auto" id="menu-logged-in" v-if="logged_in">
        <div
          class="btn btn-primary mr-3"
          id="new-task"
          data-toggle="modal"
          data-target="#newTaskModal"
        >
          <i class="fa fa-edit"></i>New Task
        </div>
        <div class="btn btn-danger mr-3" id="logout" @click.prevent="logout">
          Logout
        </div>
      </div>
      <div class="d-flex ml-auto" id="menu-logged-in" v-if="!logged_in">
        <div
          class="btn btn-primary mr-3"
          id="login"
          @click.prevent="showLoginPage"
        >
          Login
        </div>
        <div
          class="btn btn-primary mr-3"
          id="register"
          @click.prevent="showRegisterPage"
        >
          Register
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['logged_in'],
  methods: {
    showLoginPage() {
      this.$emit('showLoginPage');
    },
    showRegisterPage() {
      this.$emit('showRegisterPage');
    },
    logout() {
      this.$emit('logout');
    }
  }
};
</script>

<style></style>
