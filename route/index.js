const express = require("express");
const conn = require("../connection/data");
const control = require("../controller/controlle");
const router =express.Router();




router.get('/',control.affichagepage1get)
router.post('/',control.affichagepage1post)


router.get('/inscription',control.affichageinscriptionget)
router.post('/inscription',control.affichageinscriptionpost)



router.get('/index',control.affichageacceuil)

module.exports= router;