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
        let{email,password} =data
        conn.query('SELECT * FROM users WHERE password=? and email=?',[password,email],(error,resultat)=>{
            if(error){
               console.log(error);
                
            }
            else{
                console.log("azertyuyutre",resultat);
            }
        })
   }
}
module.exports=quete




