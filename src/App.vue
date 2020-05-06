<template>
  <div class="container-fluid">
    <Navbar
      :logged_in="logged_in"
      @showRegisterPage="showRegisterPage"
      @showLoginPage="showLoginPage"
      @logout="logout"
    ></Navbar>
    <div id="loginPage" v-if="!logged_in && page == 'login'">
      <LoginPage
        @login="login"
        :logged_in="logged_in"
        :errorMessage="errorMessage"
      ></LoginPage>
    </div>
    <div id="registerPage" v-if="!logged_in && page == 'register'">
      <RegisterPage></RegisterPage>
    </div>
    <div id="dashboardPage" v-if="logged_in">
      <div class="row">
        <div class="col-lg-3" v-for="(card, index) in categories" :key="index">
          <div class="card">
            <div class="card-header" v-bind:class="card.color">
              <p class="text-white font-weight-bold mb-0 pb-0">
                {{ card.title }}
              </p>
            </div>
            <div class="card-body">
              <div class="card" v-for="task in tasks" :key="task.id">
                <div class="card-header">
                  <p class="font-weight-bold mb-0 pb-0">{{ task.title }}</p>
                </div>
                <div class="card-body">
                  <p class="card-text">Point : {{ task.points }}</p>
                  <p class="card-text">Assigned To: {{ task.assigned_to }}</p>
                  <a href="#" class="btn btn-primary">Show Detail</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import LoginPage from './LoginPage.vue';
import RegisterPage from './RegisterPage.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    LoginPage,
    RegisterPage
  },
  data() {
    return {
      tasks: [],
      categories: [],
      logged_in: false,
      errorMessage: '',
      page: 'login',
      token: 'BskddlsacBJWEOJklbSDLKWJCLNkscnofknlZNVLDFEORFRJ'
    };
  },
  methods: {
    fetchTask() {
      axios
        .get('http://localhost:3000/tasks')
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          this.errMessage = err.message;
        });
    },
    fetchCategory() {
      axios
        .get('http://localhost:3000/category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(err => {
          this.errMessage = err.message;
        });
    },
    login(userData) {
      axios
        .get('http://localhost:3000/user')
        .then(response => {
          console.log(response.data);
          const user = response.data.filter(el => {
            return (
              el.email == userData.emailLogin &&
              el.password == userData.passwordLogin
            );
          });
          console.log(user);
          if (user.length) {
            this.logged_in = true;
            this.page = '';
            localStorage.setItem('token', this.token);
            this.fetchCategory();
            this.fetchTask();
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Email/Password did not match';
          }
        })
        .catch(err => {
          this.errorMessage = err.message;
        });
    },
    showLoginPage() {
      this.page = 'login';
    },
    showRegisterPage() {
      this.page = 'register';
    },
    logout() {
      localStorage.clear();
      this.logged_in = false;
    }
  },
  created() {
    if (localStorage.token) {
      this.logged_in = true;
    }
    this.fetchTask();
    this.fetchCategory();
  }
};
</script>

<style></style>
