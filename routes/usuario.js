var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/informafila", {native_parser: true});
var ObjectID = require('mongodb').ObjectID;

exports.fazerlogin = function(req,res){
    var login = {
        loginUsuario: req.body.login,
        senhaUsuario: req.body.senha
    }
    if ((login.loginUsuario=='')||(login.senhaUsuario=='')){
        res.send({status:1,resposta:'Login e Senha devem ser preenchidos!'});
    }else{
        if ((login.loginUsuario=='suporteinfomafila')||(login.senhaUsuario=='informasuportefila')){
            var objeto = {
                nome: 'Suporte InformaFila',
                tipo: 'Administrador'
            }
            res.send({status:2,objeto:objeto});
        }else{
            db.collection('usuario').findOne({'loginUsuario':login.loginUsuario,'senhaUsuario':login.senhaUsuario}, function(err,usuario){
                if ((usuario==null)||(usuario==undefined)){
                    res.send({status:1,resposta:'Login/Senha Incorretos'});
                }else{
                    var novoUsuario = {
                        id: usuario._id,
                        nome: usuario.nomeUsuario,
                        senha: usuario.senhaUsuario,
                        tipo: usuario.tipoUsuario
                    }
                    res.send({status:2,objeto:novoUsuario});
                }
            })
        }
    }
};

exports.salvarUsuario = function(req,res){
    var usuario = {
        idUsuario: req.body.id,
        nomeUsuario: req.body.nome,
        loginUsuario: req.body.login,
        senhaUsuario: req.body.senha,
        tipoUsuario: req.body.tipo
    }
    if ((usuario.nomeUsuario=='')||(usuario.loginUsuario=='')||(usuario.senhaUsuario=='')||(usuario.tipoUsuario=='')){
        res.send({status:1,resposta:'Todos os campos são obrigatórios'});
    }else{
        if ((usuario.idUsuario=='')||(usuario.idUsuario==null)||(usuario.idUsuario==undefined)){
            delete usuario.idUsuario;
            db.collection('usuario').insert(usuario, function(err){
                res.send({status:2});
            })
        }else{
            db.collection('usuario').update({'_id':ObjectID(usuario.idUsuario)},{$set:{'nomeUsuario':usuario.nomeUsuario,'loginUsuario':usuario.loginUsuario,'senhaUsuario':usuario.senhaUsuario,'tipoUsuario':usuario.tipoUsuario}}, function(err){
                res.send({status:2});
            })
        }
    }
};

exports.buscarUsuarios = function(req,res){
    db.collection('usuario').find().toArray(function(err,usuarios){
        var listaUsuarios = [];
        usuarios.forEach(function(item){
            var objeto = {
                id: item._id,
                nome: item.nomeUsuario,
                login: item.loginUsuario,
                senha: item.senhaUsuario,
                tipo: item.tipoUsuario
            }
            listaUsuarios.push(objeto);
        })
        res.send(listaUsuarios);
    })
};

exports.removerUsuario = function(req,res){
    var usuario = {
        idUsuario: req.body.id
    };
    if ((usuario.idUsuario=='')||(usuario.idUsuario==null)||(usuario.idUsuario==undefined)){
        res.send({status:1,resposta:'ID não encontrado!'});
    }else{
        db.collection('usuario').remove({'_id':ObjectID(usuario.idUsuario)}, function(err){
            res.send({status:2});
        })
    }
}