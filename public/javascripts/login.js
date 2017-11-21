var vmLogin = new Vue({
  el: '#login',
  data: {
    email: '',
    msg: '',
    password: ''
  },
  beforeCreate: function () {
    if(localStorage.getItem("timeTaskToken") !== null) {
      window.location.href = '/'
    }
  },
  methods: {
    getLogin: function (e) {

      this.$http.post('/login', {email: this.email, password: this.password}).then((response) => {
        console.log(response)
        if(response.body.success === true) {

          localStorage.setItem("timeTaskToken", response.body.token);
          window.location.href = '/'
        } else {
            this.msg = response.body.message
        }


      }, (response) => {
        // error callback
      });
      e.preventDefault();
    }
}
});
