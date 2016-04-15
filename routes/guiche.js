var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/informafila", {native_parser: true});
var ObjectID = require('mongodb').ObjectID;

exports.salvarGuiche = function(req,res){
    var guiche = {
        idGuiche: req.body.id,
        nomeGuiche: req.body.nome,
        descricaoGuiche: req.body.descricao
    }
    if ((guiche.nomeGuiche=='')||(guiche.descricaoGuiche=='')){
        res.send({status:1,resposta:'Todos os campos são obrigatórios'});
    }else{
        if ((guiche.idGuiche=='')||(guiche.idGuiche==null)||(guiche.idGuiche==undefined)){
            delete guiche.idGuiche;
            db.collection('guiche').insert(guiche, function(err){
                res.send({status:2});
            })
        }else{
            db.collection('guiche').update({'_id':ObjectID(guiche.idGuiche)},{$set:{'nomeGuiche':guiche.nomeGuiche,'descricaoGuiche':guiche.descricaoGuiche}}, function(err){
                res.send({status:2});
            })
        }
    }
};

exports.buscarGuiches = function(req,res){
    db.collection('guiche').find().toArray(function(err, guiches){
        var listaGuiches = [];
        guiches.forEach(function(item){
            var g = {
                id: item._id,
                nome: item.nomeGuiche,
                descricao: item.descricaoGuiche
            }
            listaGuiches.push(g);
        })
        res.send(listaGuiches);
    })
};

exports.removerGuiche = function(req,res){
    var guiche = {
        idGuiche: req.body.id
    };
    if ((guiche.idGuiche=='')||(guiche.idGuiche==null)||(guiche.idGuiche==undefined)){
        res.send({status:1,resposta:'ID não encontrado!'});
    }else{
        db.collection('guiche').remove({'_id':ObjectID(guiche.idGuiche)}, function(err){
            res.send({status:2});
        })
    }
};