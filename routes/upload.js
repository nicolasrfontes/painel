var formidable = require('formidable')
    , http = require('http')
    , fs = require('fs')
    ;
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/informafila", {native_parser: true});
var ObjectID = require('mongodb').ObjectID;

exports.uploadlogo = function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        var image = files.file
            , image_upload_path_old = image.path
            , image_upload_path_new = 'public/images/'
            , image_upload_name = 'logo.png'
            , image_upload_path_name = image_upload_path_new + image_upload_name
            ;

        if (fs.existsSync(image_upload_path_new)) {
            fs.rename(
                image_upload_path_old,
                image_upload_path_name,
                function (err) {
                    if (err) {
                        console.log('Err: ', err);
                        res.end('Deu merda na hora de mover a imagem!');
                    }
                    var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                    console.log(msg);
                    res.end(msg);
                });
        }
        else {
            fs.mkdir(image_upload_path_new, function (err) {
                if (err) {
                    console.log('Err: ', err);
                    res.end('Deu merda na hora de criar o diretório!');
                }
                fs.rename(
                    image_upload_path_old,
                    image_upload_path_name,
                    function (err) {
                        var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                        console.log(msg);
                        res.end(msg);
                    });
            });
        }
    })
};

exports.uploadfundo = function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        var image = files.file
            , image_upload_path_old = image.path
            , image_upload_path_new = 'public/images/'
            , image_upload_name = 'fundo.png'
            , image_upload_path_name = image_upload_path_new + image_upload_name
            ;

        if (fs.existsSync(image_upload_path_new)) {
            fs.rename(
                image_upload_path_old,
                image_upload_path_name,
                function (err) {
                    if (err) {
                        console.log('Err: ', err);
                        res.end('Deu merda na hora de mover a imagem!');
                    }
                    var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                    console.log(msg);
                    res.end(msg);
                });
        }
        else {
            fs.mkdir(image_upload_path_new, function (err) {
                if (err) {
                    console.log('Err: ', err);
                    res.end('Deu merda na hora de criar o diretório!');
                }
                fs.rename(
                    image_upload_path_old,
                    image_upload_path_name,
                    function (err) {
                        var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                        console.log(msg);
                        res.end(msg);
                    });
            });
        }
    })
};

exports.uploadanuncio = function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        var image = files.file
            , image_upload_path_old = image.path
            , image_upload_path_new = 'public/images/'
            , image_upload_name = 'anuncio.png'
            , image_upload_path_name = image_upload_path_new + image_upload_name
            ;

        if (fs.existsSync(image_upload_path_new)) {
            fs.rename(
                image_upload_path_old,
                image_upload_path_name,
                function (err) {
                    if (err) {
                        console.log('Err: ', err);
                        res.end('Deu merda na hora de mover a imagem!');
                    } else {
                        db.collection('anuncioprincipal').find().toArray(function (err, anuncio) {
                            if (anuncio.length == 0) {
                                var objeto = {
                                    tipo: 'imagem',
                                    url: 'anuncio.png'
                                }
                                db.collection('anuncioprincipal').insert(objeto, function (err) {
                                    res.end('ok');
                                })
                            } else {
                                var a = anuncio[0];
                                db.collection('anuncioprincipal').update({'_id': ObjectID(a._id)}, {
                                    $set: {
                                        'tipo': 'imagem',
                                        url: 'anuncio.png'
                                    }
                                }, function (err) {
                                    res.end('ok');
                                })

                            }
                        })
                    }
                });
        }
        else {
            fs.mkdir(image_upload_path_new, function (err) {
                if (err) {
                    console.log('Err: ', err);
                    res.end('Deu merda na hora de criar o diretório!');
                }
                fs.rename(
                    image_upload_path_old,
                    image_upload_path_name,
                    function (err) {

                        db.collection('anuncioprincipal').find().toArray(function (err, anuncio) {
                            if (anuncio.length == 0) {
                                var objeto = {
                                    tipo: 'imagem',
                                    url: 'anuncio.png'
                                }
                                db.collection('anuncioprincipal').insert(objeto, function (err) {
                                    res.end('ok');
                                })
                            } else {
                                var a = anuncio[0];
                                db.collection('anuncioprincipal').update({'_id': ObjectID(a._id)}, {
                                    $set: {
                                        'tipo': 'imagem',
                                        url: 'anuncio.png'
                                    }
                                }, function (err) {
                                    res.end('ok');
                                })

                            }
                        })

                    });
            });
        }
    })
};