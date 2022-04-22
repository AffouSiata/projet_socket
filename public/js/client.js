var socket = io("http://192.168.88.20:3000/index",{
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

socket.on('chat message', function(msg,usersession) {
  console.log(msg)
  console.log('tretretre',usersession)
  let global =document.createElement('div') 
  global.classList.add("mestexte")
  let nom = document.createElement('h5')
  var item = document.createElement('p');
  item.textContent = msg;
  nom.textContent = usersession.nom
  console.log("azerty",usersession.nom);
  let messages = document.querySelector('.conversation')
  messages.appendChild(global)
  global.appendChild(nom);
  global.appendChild(item);

  let milieu =document.querySelector('.milieu')
  milieu.scrollTop=milieu.scrollHeight
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
  
  document.querySelector('.nom').innerHTML =`
    <p>${data.neusers.nom}</p>
  `

  // console.log("vvvvvvv",data.membres.Nom);
  // let contenu = document.createElement('div');
  // contenu.textContent = data.membres.Nom;
  // toutUser.appendChild(contenu);
 
})