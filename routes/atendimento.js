var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/informafila", {native_parser: true});
var ObjectID = require('mongodb').ObjectID;

exports.salvarTipoAtendimento = function (req, res) {
    var tipoAtendimento = {
        idTipoAtendimento: req.body.id,
        nomeTipoAtendimento: req.body.nome,
        descricaoTipoAtendimento: req.body.descricao,
        letraTipoAtendimento: req.body.nome.charAt(0).toUpperCase()

    };
    if ((tipoAtendimento.nomeTipoAtendimento == '') || (tipoAtendimento.descricaoTipoAtendimento == '') || (tipoAtendimento.letraTipoAtendimento == '')) {
        res.send({status: 1, resposta: 'Todos os campos são obrigatórios'});
    } else {
        if ((tipoAtendimento.idTipoAtendimento == '') || (tipoAtendimento.idTipoAtendimento == null) || (tipoAtendimento.idTipoAtendimento == undefined)) {
            delete tipoAtendimento.idTipoAtendimento;
            tipoAtendimento['proximaSenha'] = '0001';
            db.collection('tipoatendimento').insert(tipoAtendimento, function (err) {
                res.send({status: 2});
            })
        } else {
            db.collection('tipoatendimento').update({'_id': ObjectID(tipoAtendimento.idTipoAtendimento)}, {
                $set: {
                    'nomeTipoAtendimento': tipoAtendimento.nomeTipoAtendimento,
                    'descricaoTipoAtendimento': tipoAtendimento.descricaoTipoAtendimento,
                    'letraTipoAtendimento': tipoAtendimento.letraTipoAtendimento
                }
            }, function (err) {
                res.send({status: 2});
            })
        }
    }
};

exports.buscarTiposAtendimento = function (req, res) {
    db.collection('tipoatendimento').find().toArray(function (err, tipos) {
        var listaTipos = [];
        tipos.forEach(function (item) {
            var objeto = {
                id: item._id,
                nome: item.nomeTipoAtendimento,
                descricao: item.descricaoTipoAtendimento,
                letra: item.letraTipoAtendimento,
                proxima: item.proximaSenha
            }
            listaTipos.push(objeto);
        })
        res.send(listaTipos);
    })
};

exports.removerTipoAtendimento = function (req, res) {
    var tipo = {
        idTipo: req.body.id
    };
    if ((tipo.idTipo == '') || (tipo.idTipo == null) || (tipo.idTipo == undefined)) {
        res.send({status: 1, resposta: 'ID não encontrado!'});
    } else {
        db.collection('tipoatendimento').remove({'_id': ObjectID(tipo.idTipo)}, function (err) {
            res.send({status: 2});
        })
    }
};

exports.salvarAnuncioVideo = function (req, res) {
    var url = req.body.url.replace('https://www.youtube.com/watch?v=','');
    db.collection('anuncioprincipal').find().toArray(function (err, anuncio) {
        if (anuncio.length == 0) {
            var objeto = {
                tipo: 'video',
                url: url
            }
            db.collection('anuncioprincipal').insert(objeto, function (err) {
                res.send({status: 2});
            })
        } else {
            var a = anuncio[0];
            db.collection('anuncioprincipal').update({'_id': ObjectID(a._id)}, {
                $set: {
                    'tipo': 'video',
                    url: url
                }
            }, function (err) {
                res.send({status: 2});
            })

        }
    })
};

exports.buscarAnuncioPrincipal = function(req,res){
    db.collection('anuncioprincipal').find().toArray(function(err,anuncio){
        res.send(anuncio[0]);
    })
}

exports.salvarInformacoes = function (req, res) {
    db.collection('infopainel').find().toArray(function (err, infos) {
        if (infos.length != 0) {
            var info = infos[0];

            db.collection('infopainel').update({'_id': ObjectID(info._id)}, {
                $set: {
                    'linha1': req.body.linha1,
                    'linha2': req.body.linha2,
                    'linha3': req.body.linha3
                }
            }, function (err) {
                res.send({status: 2});
            })


        } else {
            db.collection('infopainel').insert(req.body, function (err) {
                res.send({status: 2});
            })
        }
    })
};

exports.buscarInformacoes = function (req, res) {
    db.collection('infopainel').find().toArray(function (err, infos) {
        res.send(infos);
    })
}

























