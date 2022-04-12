const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const conn = require("./connection/data");
const router = require("./route");
const session = require('express-session');
const { log } = require("console");




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
            cookie:{maxAge:600000000}
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
        console.log('user connect');
        
        console.log(" azerty",socket.request.session);
        socket.on('chat message',(msg)=>{
            console.log('message :'  + msg);
            socket.emit('chat message' , msg)
            const mm = socket.request.session.membres
            console.log("eeeeee",mm);


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


   

    











    

        // const fatou= io.of('/index')

        // fatou.on('connection', (socket) => {
        //     // socket.broadcast.emit('hi');
        //     console.log('a user connected');
        //     console.log(" azerty",socket.request.session);

        //     socket.on('chat message', (msg) => {
        //         console.log(msg);

                   
        //     });   

        // });

        //      io.of('/index').emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
        //      io.of('/index').on('connection', (socket) => {
        //         socket.on('chat message', (msg) => {
        //         console.log(msg);
        //         io.of('/index').emit('chat message',msg)
                   
        //     });   

        //     const session = socket.request.session;
           
        // });
        


                // console.log("zertyui",socket.request.session);
                // io.of('/index').emit('chat message', msg);

                
        
        // io.on('connection', (socket) => {

        //     const session = socket.request.session;
        //     session.connections++;
        //     session.save();
        // });
        
          
   



server.listen(3000,()=>{
    console.log("listening on port 3000");
})

