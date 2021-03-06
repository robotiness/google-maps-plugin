var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var createModule=require('../middleWare/create');
var getData=require('../middleWare/getData');
var create=require('../middleWare/create');
var fs = require("fs");
var getFiles=require('../middleWare/editUserJsFile');
var crypto = require("crypto");
var check=require('../middleWare/isUserLoggedOn');
var keys=require('../../config/config');

var _key=keys.GOOGLE_KEY;

router.get('/locationsInput',function (req,res) {
	var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	res.render('locationInput.ejs',{gKey:myKey,mkey:_key,isLoggedIn:check.isUserLoggedOn(req,res)});
});

router.post('/getData',function(req,res){
	var data=req.body.data;
	var styles=req.body.styles;
	var mapName=req.body.mapName;
	styles=JSON.parse(styles);
	data=JSON.parse(data);
	const id = crypto.randomBytes(8).toString("hex");
	create.saveToDatabaseWithObject(req,data,styles,mapName,sessionDataModel,locationsModel,id,function(x){
	});
	
	res.redirect("/loginOrRegister/0");
});


module.exports = router;
