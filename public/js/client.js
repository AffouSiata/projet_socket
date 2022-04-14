var socket = io("http://localhost:3000/index",{
    withCredentials:true
  });

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
      }
});



socket.on('chat message', function(msg) {
console.log("fhjkl",msg);
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

let toutUser =[]

socket.on('new users',(data) =>{
   console.log("vvvvvvv",data);
  console.log("vvvvvvv",data.membres.Nom);
  let contenu = document.createElement('div');
  contenu.textContent = data.membres.Nom;
  toutUser.appendChild(contenu);
 
})