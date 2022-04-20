var socket = io("http://192.168.88.35:3000/index",{
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
  // let mesmessages =document.
  window.scrollTo(0, document.body.scrollHeight);
});




socket.on('new users',(data) =>{

  console.log("vvvvvvv",data.neusers);
  document.querySelector('.contentutilisateur').innerHTML +=`

    <li class="utilisateur">
    <div class="userimage">
      <img src="../public/images/1.png" alt="">
    </div>
    <div class="usernom">
      <p>${data.neusers.nom}</p>
    </div> 
    </li>
  `
  // console.log("vvvvvvv",data.membres.Nom);
  // let contenu = document.createElement('div');
  // contenu.textContent = data.membres.Nom;
  // toutUser.appendChild(contenu);
 
})