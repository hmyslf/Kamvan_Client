<template>
  <div class="container-fluid">
    <Navbar
      @showLoginPage="showLoginPage"
      @showRegisterPage="showRegisterPage"
      @logout="logout"
      :logged_in="logged_in"
    ></Navbar>
    <div id="loginForm" v-if="!logged_in && page == 'login'">
      <LoginForm
        :successMessage="successMessage"
        :errorMessage="errorMessage"
        @login="login"
        @onSignIn="onSignIn"
      ></LoginForm>
    </div>
    <div id="registerForm" v-if="!logged_in && page == 'register'">
      <RegisterForm
        @register="register"
        :errorMessage="errorMessage"
      ></RegisterForm>
    </div>
    <div id="dashboardPage" v-if="logged_in">
      <div class="row">
        <CategoryList
          v-for="(category, index) in categories"
          @detailTask="detailTask"
          @updateTask="updateTask"
          :key="index"
          :category="category"
          :backgrounds="backgrounds"
          :index="index"
        ></CategoryList>
      </div>
    </div>
    <NewTaskForm @addnewTask="addNewTask"></NewTaskForm>
    <DetailTask
      :task="task"
      :categories="categories"
      :errorMessage="errorMessage"
      :userId="userId"
      @confirmDelete="confirmDelete"
      @updateTask="updateTask"
      @showEdit="showEdit"
    ></DetailTask>
    <EditTask
      :task="task"
      @updateTask="updateTask"
      :errorMessage="errorMessage"
    ></EditTask>
    <DeleteTask
      :task="task"
      @deleteTask="deleteTask"
      :errorMessage="errorMessage"
    ></DeleteTask>
  </div>
</template>

<script>
import CategoryList from './components/CategoryList.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Navbar from './components/Navbar.vue';
import NewTaskForm from './components/NewTaskForm.vue';
import DetailTask from './components/DetailTask.vue';
import EditTask from './components/EditTask.vue';
import DeleteTask from './components/DeleteTask.vue';
import io from 'socket.io-client';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CategoryList,
    LoginForm,
    RegisterForm,
    Navbar,
    NewTaskForm,
    DetailTask,
    EditTask,
    DeleteTask
  },
  data() {
    return {
      // tasks: [],
      task: {},
      categories: [],
      backgrounds: ['bg-danger', 'bg-warning', 'bg-primary', 'bg-success'],
      logged_in: false,
      errorMessage: '',
      successMessage: '',
      page: 'login',
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('UserId'),
      baseUrl: `https://secret-mountain-19602.herokuapp.com`,
      socket: null
    };
  },
  methods: {
    detailTask(task) {
      this.task = task;
      $('#detailModal').modal('show');
    },
    showEdit(task) {
      this.task = task;
      $('#detailModal').modal('hide');
      $('#editModal').modal('show');
    },
    confirmDelete(task) {
      $('#detailModal').modal('hide');
      $('#deleteModal').modal('show');
    },
    updateTask(task) {
      console.log(task);
      axios
        .put(`${this.baseUrl}/tasks/${task.id}`, task, {
          headers: {
            token: this.token
          }
        })
        .then(response => {
          console.log(response.data);
          $('#detailModal').modal('hide');
          $('#editModal').modal('hide');
          this.fetchCategory();
          this.socket.emit('incoming category', this.categories);
        })
        .catch(err => {
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
          this.errorMessage = err.response.data.error.msg;
        });
    },
    fetchCategory() {
      axios
        .get(`${this.baseUrl}/category`)
        .then(response => {
          this.categories = response.data.Categories;
        })
        .catch(err => {
          this.errorMessage = err.message;
        });
    },
    register(userData) {
      axios
        .post(`${this.baseUrl}/register`, userData)
        .then(response => {
          this.page = 'login';
          this.successMessage = `Register Success, Please Login!`;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.errorMessage = '';
        })
        .catch(err => {
          let errors = err.response.data.errors || err.response.data.error;
          if (Array.isArray(errors)) {
            for (let i = 0; i < errors.length; i++) {
              this.errorMessage += `${errors[i].msg},`;
            }
          } else {
            this.errorMessage = errors;
          }
        });
    },
    login(userData) {
      axios
        .post(`${this.baseUrl}/login`, userData)
        .then(response => {
          this.logged_in = true;
          this.page = '';
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('UserId', response.data.UserId);
          this.errorMessage = '';
        })
        .catch(err => {
          this.errorMessage = err.response.data.error.message;
        });
    },
    onSignIn(googleUser) {
      console.log('disini');
      const id_token = googleUser.getAuthResponse().id_token;
      const profile = googleUser.getBasicProfile();
      axios
        .post(
          `${this.baseUrl}/google-login`,
          {},
          {
            headers: {
              google_token: id_token,
              first_name: profile.pW,
              last_name: profile.qU
            }
          }
        )
        .then(response => {
          this.logged_in = true;
          this.page = '';
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('UserId', response.data.UserId);
          this.errorMessage = '';
        })
        .catch(err => {
          console.log(err.response);
          this.errorMessage = err.response.data.errors.message;
        });
    },
    addNewTask(taskData) {
      axios
        .post(
          `${this.baseUrl}/tasks`,
          {
            title: taskData.title,
            category: 'backlog',
            points: taskData.points,
            description: taskData.description,
            assigned_to: taskData.assigned_to
          },
          {
            headers: {
              token: this.token
            }
          }
        )
        .then(res => {
          $('#newTaskModal').modal('hide');
          this.fetchCategory();
          this.socket.emit('incoming category', this.categories);
        })
        .catch(err => {
          this.errorMessage = err.message;
        });
    },
    deleteTask(id) {
      axios
        .delete(`${this.baseUrl}/tasks/${id}`, {
          headers: {
            token: this.token
          }
        })
        .then(res => {
          $('#detailModal').modal('hide');
          $('#deleteModal').modal('hide');
          this.fetchCategory();
          this.socket.emit('incoming category', this.categories);
        })
        .catch(err => {
          console.log(err.response);
          this.errorMessage = err.response.data.error.msg;
        });
    },
    showLoginPage() {
      this.page = 'login';
      this.errorMessage = '';
    },
    showRegisterPage() {
      this.page = 'register';
      this.errorMessage = '';
    },
    logout() {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        localStorage.clear();
        this.logged_in = false;
        this.page = 'login';
        this.errorMessage = '';
      });
    }
  },
  created() {
    if (localStorage.token) {
      this.logged_in = true;
    }
    this.fetchCategory();
    this.socket = io(this.baseUrl);
    this.socket.connect();
    this.socket.on('outgoing category', data => {
      this.categories = data.num;
    });
  },
  mounted() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }
};
</script>

<style></style>
