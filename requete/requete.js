const res = require("express/lib/response");
const conn = require("../connection/data");
const control = require("../controller/controlle");


const quete = class{

    static insertion = (data)=>{
        // console.log(req.body);
        let {nom, prenom, email, password} = data;
        let inserer = "INSERT INTO users(nom,prenom,password,email)VALUES(?,?,?,?)";
            conn.query(inserer,[nom,prenom,password,email],(error,resultat)=>{
               if(error){
                    console.log(error)
                    return{erreur:error}
               }
               else{
                    console.log(resultat);
                    return{succes:resultat}
               }
           })   

   }


   
   static connexion =(data)=>{
       return new Promise((resolve,reject)=>{
        let{email,password} =data
        console.log("ertyui",data);
        conn.query('SELECT * FROM users WHERE email=?',[email],(error,resultat)=>{
            console.log("rrrrrrrr",resultat);
            
            if(resultat == ""){

                // res.render('page1')
                console.log("email existe pas");
                reject(error);
            }
            else{
                // res.redirect('/index')
                console.log("email existe");
                resolve(resultat)
            }

       })






        
            // if(data.email == resultat.email && data.password == resultat.password){
            //     res.redirect("/index")
            // }
            // else{
            //     console.log("les idenfiants ne correspondent pas")
            // }
            // if(error){
            //    console.log(error);
                
            // }
            // else{
            //     console.log("azertyuyutre",resultat);
            // }
        })
   }
}
module.exports=quete




