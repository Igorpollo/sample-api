var socket = io.connect();

var vmIndex = new Vue({
  el: '#todo',
  data: {
    subtitle: 'Hello Vue.js!',
    text: '',
    messages: [],
    token: '',
    user: {
      logedIn: false
    }
  },
  methods: {
    sendMessage: function () {
      socket.emit('chatMessage', this.text);
      this.text = ''
    }
},
created: function () {
  // Verifica se o usuário possui um token
    if(localStorage.getItem("timeTaskToken") !== null) {
      var token = localStorage.getItem("timeTaskToken");
      console.log(token);
      this.token = token
      // Pegar as informações do usuário e salva em 'user'
      this.$http.post('/user', {token: token}).then((response) => {
        console.log(response)
        this.user = response.body
        // Define logado como True
        this.user.loggedIn = true;
      }, (response) => {
        // error callback
      })

    }
  }
});


socket.on('chatMessage', function(msg){
  console.log('Client side message: ' + msg)
  vmIndex.messages.push(msg);
});
