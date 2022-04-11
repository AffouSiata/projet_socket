const { request } = require("express");
const express = require("express");
const conn = require("../connection/data");
const quete = require("../requete/requete");
const router =  express.Router();



const control = class{


    
    static affichageacceuil =(req=request,res=response)=>{
        if(req.session.utilisateur){
            res.redirect('/index')
        }
        else{
            res.render('page1')
        }
        
    }
    static affichageinscriptionget =(req=request,res=response)=>{
        res.render('inscription')
    }



    static affichagepage1get =(req=request,res=response)=>{
        if(req.session.utilisateur){
            res.render('index')
        }
        else{
            res.render('page1')
        }
        
    }



    static affichagepage1post =(req=request,res=response)=>{
        
       quete.connexion(req.body)
       .then(success =>{
            res.render('index')


            let session ={
                email:req.body.email
            }
            req.session.utilisateur = session
            console.log("sssss",req.session);
       })
       .catch(error =>{
           res.render('page1')
           console.log("ERROR");
       })
 
        
    }
    static affichageinscriptionpost=(req=request,res=response)=>{
       
         quete.insertion(req.body);
        res.redirect('/')


    }
}
module.exports=control;