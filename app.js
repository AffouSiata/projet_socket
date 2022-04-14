const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000/index", "http://192.168.88.35:3000"],
        credentials: true
    }
});
const conn = require("./connection/data");
const router = require("./route");
const session = require('express-session');





conn.connect((error)=>{
    if(error){
        console.log("connexion echoué");
    }
    else{
        console.log("connexion reussie");


        const sessionMiddleware = (session({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: true,
            cookie:{maxAge:600000}
        }));


        app.use(sessionMiddleware);
        

        io.of('/index').use((socket, next) => {
            sessionMiddleware(socket.request, {}, next);
            
        });
        
       
       

        app.set('views','./views')   
        app.set('view engine','ejs') 
        app.use('/public',express.static('public'))

        app.use(express.urlencoded({extended:true}))
    
        app.use('/',router)

    }

})
 io.of('/index').emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

    io.of('/index').on('connection', (socket) => {

         io.of('/index').emit('new users', {neusers:socket.request.session.membres})
        console.log('user connect');
        console.log(" azerty",socket.request.session);
        
    
        socket.on('chat message',(msg)=>{
            console.log('message :'  + msg);
            socket.emit('chat message' , msg)
           
            const mm = socket.request.session.membres.ID
            console.log("eeeeee",mm);
            console.log("socket.request.session total",socket.request.session);
        


            let inserer = "INSERT INTO messages (texte,usersid) VALUES(?, ?)";
            conn.query(inserer,[msg, mm],(error,resultat)=>{
            if(error){
                  console.log("mon erreur",error)
              }
              else{
                  console.log("bien enregistré",resultat);
              }
            })

        })
       
        
           
    });


server.listen(3000,()=>{
    console.log("listening on port 3000");
})

