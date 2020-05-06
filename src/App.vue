<template>
  <div class="container-fluid">
    <Navbar
      @showLoginPage="showLoginPage"
      @showRegisterPage="showRegisterPage"
      @logout="logout"
      :logged_in="logged_in"
    ></Navbar>
    <div id="loginForm" v-if="!logged_in && page == 'login'">
      <LoginForm :errorMessage="errorMessage" @login="login"></LoginForm>
    </div>
    <div id="registerForm" v-if="!logged_in && page == 'register'">
      <RegisterForm></RegisterForm>
    </div>
    <div id="dashboardPage" v-if="logged_in">
      <div class="row">
        <CategoryList
          v-for="(card, index) in categories"
          @detailTask="detailTask"
          :key="index"
          :tasks="tasks"
          :card="card"
        ></CategoryList>
      </div>
    </div>
    <NewTaskForm @addnewTask="addNewTask"></NewTaskForm>
    <DetailTask :task="task"></DetailTask>
  </div>
</template>

<script>
import CategoryList from './components/CategoryList.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Navbar from './components/Navbar.vue';
import NewTaskForm from './components/NewTaskForm.vue';
import DetailTask from './components/DetailTask.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CategoryList,
    LoginForm,
    RegisterForm,
    Navbar,
    NewTaskForm,
    DetailTask
  },
  data() {
    return {
      tasks: [],
      task: {},
      categories: [],
      logged_in: false,
      errorMessage: '',
      page: 'login',
      token: 'BskddlsacBJWEOJklbSDLKWJCLNkscnofknlZNVLDFEORFRJ'
    };
  },
  methods: {
    detailTask(task) {
      this.task = task;
      $('#detailModal').modal('show');
    },
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
          console.log(userData);
          const user = response.data.filter(el => {
            return (
              el.email == userData.email && el.password == userData.password
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
          this.errMessage = err.message;
        });
    },
    addNewTask(taskData) {
      axios
        .post('http://localhost:3000/tasks', {
          id: 6,
          title: taskData.title,
          category: 'backlog',
          description: taskData.description,
          assigned_to: taskData.assigned_to
        })
        .then(res => {
          $('#newTaskModal').modal('hide');
          this.tasks.push(res.data);
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
