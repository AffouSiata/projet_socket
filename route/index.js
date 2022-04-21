const express = require("express");
const conn = require("../connection/data");
const control = require("../controller/controlle");
const router =express.Router();




router.get('/',control.affichageconnexionget)
router.post('/',control.affichageconnexionpost)


router.get('/inscription',control.affichageinscriptionget)
router.post('/inscription',control.affichageinscriptionpost)



router.get('/index',control.affichageacceuil)

module.exports= router;