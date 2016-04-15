var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/informafila", {native_parser: true});
var ObjectID = require('mongodb').ObjectID;

exports.salvarTipoAtendimento = function(req,res){
    var tipoAtendimento = {
        idTipoAtendimento:req.body.id,
        nomeTipoAtendimento: req.body.nome,
        descricaoTipoAtendimento: req.body.descricao,
        letraTipoAtendimento: req.body.nome.charAt(0).toUpperCase()
    };
    if ((tipoAtendimento.nomeTipoAtendimento=='')||(tipoAtendimento.descricaoTipoAtendimento=='')||(tipoAtendimento.letraTipoAtendimento=='')){
        res.send({status:1,resposta:'Todos os campos são obrigatórios'});
    }else{
        if ((tipoAtendimento.idTipoAtendimento=='')||(tipoAtendimento.idTipoAtendimento==null)||(tipoAtendimento.idTipoAtendimento==undefined)){
            delete tipoAtendimento.idTipoAtendimento;
            db.collection('tipoatendimento').insert(tipoAtendimento, function(err){
                res.send({status:2});
            })
        }else{
            db.collection('tipoatendimento').update({'_id':ObjectID(tipoAtendimento.idTipoAtendimento)},{$set:{
                'nomeTipoAtendimento':tipoAtendimento.nomeTipoAtendimento,'descricaoTipoAtendimento': tipoAtendimento.descricaoTipoAtendimento,'letraTipoAtendimento': tipoAtendimento.letraTipoAtendimento}}, function(err){
                res.send({status:2});
            })
        }
    }
};

exports.buscarTiposAtendimento = function(req,res){
    db.collection('tipoatendimento').find().toArray(function(err,tipos){
        var listaTipos = [];
        tipos.forEach(function(item){
            var objeto = {
                id: item._id,
                nome: item.nomeTipoAtendimento,
                descricao: item.descricaoTipoAtendimento,
                letra: item.letraTipoAtendimento
            }
            listaTipos.push(objeto);
        })
        res.send(listaTipos);
    })
};

exports.removerTipoAtendimento = function(req,res){
    var tipo = {
        idTipo: req.body.id
    };
    if ((tipo.idTipo=='')||(tipo.idTipo==null)||(tipo.idTipo==undefined)){
        res.send({status:1,resposta:'ID não encontrado!'});
    }else{
        db.collection('tipoatendimento').remove({'_id':ObjectID(tipo.idTipo)}, function(err){
            res.send({status:2});
        })
    }
};