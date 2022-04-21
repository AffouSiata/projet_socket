const { request } = require("express");
const express = require("express");
const conn = require("../connection/data");
const quete = require("../requete/requete");
const router =  express.Router();



const control = class{


    
    static affichageacceuil =(req=request,res=response)=>{
    
        // console.log("dfdfdff",ppp.ID);
        if(req.session.membres){
            
        
            conn.query('SELECT * FROM messages where usersid= ?',[req.session.membres.id_user],(error,resultat)=>{
                
                console.log("stockage",resultat);
                res.render('index',{resultat:resultat})  
            })
        }
        else{
            res.redirect('/')
        }
        
    }
    static affichageinscriptionget =(req=request,res=response)=>{
        res.render('inscription')
    }



    static affichageconnexionget=(req=request,res=response)=>{
        if(req.session.membres){
            res.redirect('/index')  
        }
        else{
            res.render('connexion')
        }
     
    }

ession


    static affichageconnexionpost=(req=request,res=response)=>{
        
       quete.connexion(req.body)
       .then(success =>{
        //    console.log("ggggggg",success);


           
           let toutsession ={
                id_user:success.id_user,
               nom:success.nom
           }
            
            // let userid = success[0].ID
            req.session.membres = toutsession
            // console.log("sssss",req.session.membres);

            res.redirect('/index')
       })
       .catch(error =>{
           res.render('connexion')
           console.log("ERROR",error);
       })
        
    }

    static affichageinscriptionpost=(req=request,res=response)=>{
       
         quete.insertion(req.body);
        res.redirect('/')


    }
}
module.exports=control;
