const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const conn = require("./connection/data");
const router = require("./route");
const session = require('express-session');
const sessionMiddleware = session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }});




conn.connect((error)=>{
    if(error){
        console.log("connexion echoué");
    }
    else{
        console.log("connexion reussie");
        

        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

        const sessionMiddleware = session({
            secret: "changeit",
            resave:false,
            saveUninitialized:false
        });
       


        io.use(wrap(sessionMiddleware));

        app.set('views','./views')   
        app.set('view engine','ejs') 
        app.use('/public',express.static('public'))

        app.use(express.urlencoded({extended:true}))

        app.use(sessionMiddleware);

        app.use('/',router)

        
        io.use((socket, next) => {
            sessionMiddleware(socket.request, {}, next);
            
        });

        io.use((socket, next) => {
            const session = socket.request.session;
            console.log('masession',session);
            if (session && session.authenticated) {
                next();
            } else {
                next(new Error("unauthorized"));
    
            }
        });


        
        io.of('/index').on('connection', (socket) => {
            socket.broadcast.emit('hi');
            console.log('a user connected');
            console.log(" azerty",socket.request.session);

            io.of('/index').emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
            socket.on('chat message', (msg) => {
                console.log(msg);
                console.log("zertyui",socket.request.session);
                io.of('/index').emit('chat message', msg);

                // let inserer = "INSERT INTO messages(texte)VALUES(?);";
                // conn.query(inserer,[msg],(error,resultat)=>{
                //     if(error){
                //         console.log(error)
                //     }
                //     else{
                //         console.log(resultat);
                //     }
                // })
               
            });   
           
        });
        
        io.on('connection', (socket) => {

            const session = socket.request.session;
            session.connections++;
            session.save();
        });
        
          
    }
})


server.listen(3000,()=>{
    console.log("listening on port 3000");
})







// socket.on('chat message',(msg){
        //     let uid= msg['uid'];
        //     console.log("ertyuiop",uid);
        //     
         
        // })