new Vue({
  el: '#app',
  data: {
    tasks: [],
    categories: [],
    emailLogin: '',
    passwordLogin: '',
    logged_in: false,
    errorMessage: '',
    page: 'login',
    token: 'BskddlsacBJWEOJklbSDLKWJCLNkscnofknlZNVLDFEORFRJ'
  },
  methods: {
    fetchTask() {
      axios.get('http://localhost:3000/tasks')
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          this.errMessage = err.message;
        });
    },
    fetchCategory() {
      axios.get('http://localhost:3000/category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(err => {
          this.errMessage = err.message
        });
    },
    login() {
      console.log("disini")
      axios.get('http://localhost:3000/user')
        .then(response => {
          console.log(response.data);
          const user = response.data.filter(el => {
            return (el.email == this.emailLogin && el.password == this.passwordLogin);
          });
          console.log(user);
          if(user.length) {
            this.logged_in = true;
            this.page = '';
            localStorage.setItem('token', this.token);
            this.fetchCategory();
            this.fetchTask();
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Email/Password did not match'
          }
        })
        .catch(err => {
          this.errMessage = err.message;
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
    if(localStorage.token) {
      this.logged_in = true;
    }
    this.fetchTask();
    this.fetchCategory();
  }
});