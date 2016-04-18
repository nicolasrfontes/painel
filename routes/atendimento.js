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

exports.novoAtendimento = function(req,res){
    var dia = new Date().getDate();
    if (dia<10){dia = '0'+dia;}
    var mes = new Date().getMonth()+1;
    if (mes<10){mes = '0'+mes;}
    var ano = new Date().getFullYear();
    var objeto = {
        data: dia+'/'+mes+'/'+ano,
        atendente: '',
        senha: req.body.letra+req.body.proxima,
        guiche: '',
        status: 'Aguardando',
        tipoatendimento:req.body.nome
    };
    db.collection('senha').insert(objeto, function(err){
        var proxima = (parseInt(req.body.proxima)+1).toString();
        if (proxima.length==1){
            proxima = '000'+proxima;
        }
        if (proxima.length==2){proxima = '00'+proxima;}
        if (proxima.length==3){proxima = '0'+proxima;}
        if (proxima==9999){proxima = '0001';}
        db.collection('tipoatendimento').update({'_id':ObjectID(req.body.id)},{$set:{'proximaSenha':proxima}}, function(err){
            res.send('ok');
        })
    })
}

exports.buscarSenhasAguardando = function(req,res){
    db.collection('tipoatendimento').find().toArray(function(err,tipos){
        db.collection('senha').find({'status':'Aguardando'}).toArray(function(err,senhas){
            var listaSenhas = [];
            tipos.forEach(function(item){
                var objeto = {
                    categoria: item.nomeTipoAtendimento,
                    senhas: []
                }
                for(var i=0;i<senhas.length;i++){
                    if (item.nomeTipoAtendimento==senhas[i].tipoatendimento){
                        objeto.senhas.push(senhas[i]);
                    }
                }
                listaSenhas.push(objeto);
            })
            res.send(listaSenhas)
        })
    })
};

exports.buscarSenhasAtendimento = function(req,res){
    db.collection('senha').find({'status':'Atendendo'}).toArray(function(err,senhas){
        res.send(senhas);
    })
}

exports.realizarAtendimento = function(req,res){
    db.collection('senha').findOne({'guiche':req.body.guiche,'status':'Atendendo'}, function(err,senha){
        if (senha!=null){
            db.collection('senha').update({'_id':ObjectID(senha._id)},{$set:{'status':'Atendido'}}, function(err){
                db.collection('senha').update({'_id':ObjectID(req.body._id)},{$set:{'atendente':req.body.atendente,'guiche':req.body.guiche,'status':'Atendendo'}}, function(err){
                    res.send('ok');
                })
            })
        }else{
            db.collection('senha').update({'_id':ObjectID(req.body._id)},{$set:{'atendente':req.body.atendente,'guiche':req.body.guiche,'status':'Atendendo'}}, function(err){
                res.send('ok');
            })
        }
    })
};

exports.buscarNovoAtendimento = function(req,res){
    var novas = req.body.senha;
    db.collection('senha').find({'status':'Atendendo'}).toArray(function(err,senhas){
        var teve = '';
        var objeto;
        senhas.forEach(function(item){
            var tem = '';
            for(var i=0;i<novas.length;i++){
                if ((item.senha==novas[i].senha)&&(item.guiche==novas[i].guiche)&&(item.status==novas[i].status)){
                    tem = 'ok';
                }
            }
            if (tem==''){
                teve = 'teve';
                objeto = item;
            }
        })
        if (teve==''){
            res.send({resposta: '2'});
        }else{
            res.send({resposta:'1',objeto:objeto});
        }
    })
}



















