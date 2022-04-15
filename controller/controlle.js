const { request } = require("express");
const express = require("express");
const conn = require("../connection/data");
const quete = require("../requete/requete");
const router =  express.Router();



const control = class{


    
    static affichageacceuil =(req=request,res=response)=>{
        const ppp= req.session.membres
        // console.log("dfdfdff",ppp.ID);
        if(ppp){
        
            conn.query('SELECT * FROM messages where usersid= ?',[ppp.ID],(error,resultat)=>{
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



    static affichagepage1get =(req=request,res=response)=>{
        if(req.session.membres){
            res.redirect('/index')  
        }
        else{
            res.render('connexion')
        }
     
    }

ession


    static affichagepage1post =(req=request,res=response)=>{
        
       quete.connexion(req.body)
       .then(success =>{
        //    console.log("ggggggg",success);


           
           let toutsession ={
               ID:success.ID,
               Nom:success.Nom
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
