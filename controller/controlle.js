const { request } = require("express");
const express = require("express");
const conn = require("../connection/data");
const quete = require("../requete/requete");
const router =  express.Router();



const control = class{


    
    static affichageacceuil =(req=request,res=response)=>{
       
        // res.render('index')
        if(req.session.membres){
            res.render('index')  
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
           console.log("ggggggg",success);
            
            let userid = success[0].ID
            
            req.session.membres = userid
            console.log("sssss",req.session.membres);

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