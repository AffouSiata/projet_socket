const { request } = require("express");
const express = require("express");
const conn = require("../connection/data");
const quete = require("../requete/requete");
const router =  express.Router();



const control = class{


    
    static affichageaccueil =(req=request,res=response)=>{
        res.render('index')
    }
    static affichageinscriptionget =(req=request,res=response)=>{
        res.render('inscription')
    }
    static affichageconnexionget =(req=request,res=response)=>{
        res.render('page1')
    }



    static affichageconnexionpost =(req=request,res=response)=>{
       quete.connexion(req.body);
       res.redirect('/index')
        
    }
    static affichageinscriptionpost=(req=request,res=response)=>{
       
        quete.insertion(req.body);
        res.redirect('/page1')


    }
}
module.exports=control;